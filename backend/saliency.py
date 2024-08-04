import io
import os
from PIL import Image
import torchvision.transforms as transforms
import torch
import numpy as np
import cv2
from cv2.typing import MatLike
import matplotlib.pyplot as plt
from typing import Literal

from net.models.SUM import SUM
from net.configs.config_setting import setting_config


# Condition:
# 0: Natural scenes based on the Salicon dataset (Mouse data).
# 1: Natural scenes (Eye-tracking data).
# 2: E-Commercial images.
# 3: User Interface (UI) images.
Condition = Literal[1,2,3,4]

filename = "test"

def pil_to_cv2(pil_image):
    # Convert PIL image to RGB if it's in RGBA mode
    if pil_image.mode == 'RGBA':
        pil_image = pil_image.convert('RGB')
    
    # Convert PIL image to NumPy array
    numpy_image = np.array(pil_image)
    
    # Convert RGB to BGR (OpenCV uses BGR by default)
    opencv_image = cv2.cvtColor(numpy_image, cv2.COLOR_RGB2BGR)
    
    return opencv_image


def setup_model(device: torch.device) -> SUM:
    config = setting_config
    model_cfg = config.model_config
    if config.network == 'sum':
        model = SUM(
            num_classes=model_cfg['num_classes'],
            input_channels=model_cfg['input_channels'],
            depths=model_cfg['depths'],
            depths_decoder=model_cfg['depths_decoder'],
            drop_path_rate=model_cfg['drop_path_rate'],
        )
        model.load_state_dict(torch.load('net/pre_trained_weights/sum_model.pth', map_location=device))
        model.to(device)
        return model
    else:
        raise NotImplementedError("The specified network configuration is not supported.")


def load_and_preprocess_image(img_path):
    image = Image.open(img_path).convert('RGB')
    orig_size = image.size
    transform = transforms.Compose([
        transforms.Resize((256, 256)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])
    image = transform(image)
    return image, orig_size


def saliency_map_prediction(img, orig_size, condition, model, device):
    img = img.unsqueeze(0).to(device)
    one_hot_condition = torch.zeros((1, 4), device=device)
    one_hot_condition[0, condition] = 1
    model.eval()
    with torch.no_grad():
        pred_saliency = model(img, one_hot_condition)

    pred_saliency = pred_saliency.squeeze().cpu().numpy()
    return pred_saliency, orig_size


def overlay_heatmap_on_image(original_image: MatLike, hot_output_image: MatLike) -> MatLike:
    # Read the original image
    orig_size = original_image.shape[:2]  # Height, Width

    # Read the heatmap image as grayscale
    hot_output_image = cv2.cvtColor(hot_output_image, cv2.IMREAD_GRAYSCALE)

    # Resize the heatmap to match the original image size
    hot_output_image = cv2.resize(hot_output_image, (orig_size[1], orig_size[0]))

    # Apply color map to the heatmap
    hot_output_image = cv2.applyColorMap(hot_output_image, cv2.COLORMAP_JET)

    # Overlay the heatmap on the original image
    overlay_image = cv2.addWeighted(original_image, 1, hot_output_image, 0.8, 0)

    return overlay_image


def generate_maps(image: Image.Image, orig_size, condition: Condition, model: SUM, device: torch.device) -> MatLike:
    pred_saliency, orig_size = saliency_map_prediction(image, orig_size, condition, model, device)

    # Save HOT heatmap
    plt.figure()
    plt.imshow(pred_saliency, cmap='hot')
    plt.axis('off')

    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight', pad_inches=0)
    buf.seek(0)
    plt.close()

    img = Image.open(buf)
    img_cv = cv2.cvtColor(np.array(img), cv2.COLOR_RGBA2BGR)
    hot_output_image = cv2.resize(img_cv, orig_size, interpolation=cv2.INTER_AREA)

    # hot_output_filename = os.path.join("output_results", f'{filename}_saliencymap.png')
    # cv2.imwrite(hot_output_filename, hot_output_image)
    # print(f"Saved HOT saliency map to {hot_output_filename}")

    # # Generate overlay
    # overlay_output_filename = os.path.join("output_results", f'{filename}_overlay.png')
    # cv2_image = pil_to_cv2(image)
    # overlay_image = overlay_heatmap_on_image(cv2_image, hot_output_image)
    # cv2.imwrite(overlay_output_filename, overlay_image)
    # print(f"Saved overlay image to {overlay_output_filename}")

    return hot_output_image


# if __name__ == "__main__":
#     def to_image(args: tuple[str, Condition]):
#         img_path, condition = args

#         img, orig_size = load_and_preprocess_image(img_path)
#         print(img)
#         assert isinstance(img, Image.Image)
#         return img, orig_size, condition

#     i: list[tuple[str, Condition]] = [
#         ("images/celeb.jpg", 1),
#         # ("images/drawing.jpeg", 1),
#         # ("images/poster.png", 3),
#     ]
#     input = list(map(to_image, i))

#     # print(input)
#     device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
#     model = setup_model(device)
#     for img, orig_size, condition in input:
#         generate_maps(img, orig_size, condition, model, device)

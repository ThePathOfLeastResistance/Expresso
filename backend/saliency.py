import io
import os
from PIL import Image
import torchvision.transforms as transforms
import torch
from torch import Tensor
from typing import Any
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

def pil_to_cv2(pil_image: Image.Image) -> MatLike:
    # Convert PIL image to RGB if it's not already
    if pil_image.mode != 'RGB':
        pil_image = pil_image.convert('RGB')
    
    # Convert PIL image to numpy array
    numpy_image = np.array(pil_image)
    
    # Convert RGB to BGR (OpenCV uses BGR)
    opencv_image = cv2.cvtColor(numpy_image, cv2.COLOR_RGB2BGR)
    
    return opencv_image
    

def pil_to_tensor(image: Image.Image) -> tuple[Tensor, tuple[int, int]]:
    orig_size = image.size
    transform = transforms.Compose([
        transforms.Resize((256, 256)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])
    tensor: Any = transform(image)
    assert isinstance(tensor, Tensor)
    return tensor, orig_size


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
        model.load_state_dict(torch.load('net/pre_trained_weights/sum_model.pth', map_location=device, weights_only=True))
        model.to(device)
        return model
    else:
        raise NotImplementedError("The specified network configuration is not supported.")


def saliency_map_prediction(img: Tensor, orig_size: tuple[int, int], condition: Condition, model: SUM, device: torch.device) -> tuple[np.ndarray, tuple[int, int]]:
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

    # Convert the heatmap image to grayscale if it's not already
    if len(hot_output_image.shape) == 3:
        hot_output_image = cv2.cvtColor(hot_output_image, cv2.COLOR_BGR2GRAY)
    
    # Resize the heatmap to match the original image size
    hot_output_image = cv2.resize(hot_output_image, (orig_size[1], orig_size[0]))
    
    # Ensure the heatmap is in uint8 format
    hot_output_image = cv2.normalize(hot_output_image, None, 0, 255, cv2.NORM_MINMAX)
    hot_output_image = np.uint8(hot_output_image)
    
    # Apply color map to the heatmap
    hot_output_image = cv2.applyColorMap(hot_output_image, cv2.COLORMAP_JET)
    
    # Overlay the heatmap on the original image
    overlay_image = cv2.addWeighted(original_image, 1, hot_output_image, 0.8, 0)
    
    return overlay_image

def generate_maps(pil_image: Image.Image, condition: Condition, model: SUM, device: torch.device) -> tuple[MatLike, MatLike]:
    image, orig_size = pil_to_tensor(pil_image)
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

    # Generate overlay
    cv2_image = pil_to_cv2(pil_image)
    # overlay_output_filename = os.path.join("output_results", f'{filename}_overlay.png')
    overlay_image = overlay_heatmap_on_image(cv2_image, hot_output_image)
    # cv2.imwrite(overlay_output_filename, overlay_image)
    # print(f"Saved overlay image to {overlay_output_filename}")

    return hot_output_image, overlay_image


if __name__ == "__main__":
    import base64
    from io import BytesIO
    def file_to_base64(file_path):
        with open(file_path, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read())
        return encoded_string.decode('utf-8')

    def to_image(args: tuple[str, Condition]):
        img_path, condition = args
        encoded_img = file_to_base64(img_path)

        img_data = base64.b64decode(encoded_img)
        image = Image.open(BytesIO(img_data)).convert('RGB')

        return image, condition

    i: list[tuple[str, Condition]] = [
        ("images/celeb.jpg", 1),
        # ("images/drawing.jpeg", 1),
        # ("images/poster.png", 3),
    ]
    input = list(map(to_image, i))

    # print(input)
    device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
    model = setup_model(device)
    for img, condition in input:
        image, overlay_image = generate_maps(img, condition, model, device)
        # print(image)
        print(overlay_image)
        
        tmp_path = "/tmp/overlay.jpg"
        cv2.imwrite(tmp_path, overlay_image)

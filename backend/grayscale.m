function result = analyze_image_grayscale(image_path)
    % Read the image
    img = imread(image_path);

    % Convert the image to grayscale
    gray_img = rgb2gray(img);

    % Example analysis: Compute the mean grayscale value
    mean_gray = mean(gray_img(:));

    % Return the result
    result = struct('meanGray', mean_gray);
end

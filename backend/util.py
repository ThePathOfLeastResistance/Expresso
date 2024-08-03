from openai import OpenAI

from api_key import api_key
client = OpenAI(api_key=api_key)

def image_analysis(base64_image: str):
    response = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=[
            {
            "role": "user",
            "content": [
                {"type": "text", "text": "What's in this image?"},
                {
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/jpeg;base64,{base64_image}",
                },
                },
            ],
            }
        ],
        max_tokens=300,
    )

    return response.choices[0]

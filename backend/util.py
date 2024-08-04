from openai import OpenAI

from api_key import api_key
client = OpenAI(api_key=api_key)

def image_analysis(base64_image_url: str):
    response = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=[
            {
            "role": "user",
            "content": [
                {"type": "text", "text": "This is an adobe express add-on aimed toward designers and marketers, to improve their productivity by providing feedback. Provide concise but detailed bullet point feedback about the attached design about: 1.visual hierarchy/composition/layout 2.colour/contrast 3.text/font 4.content relevance/marketability 5.branding and consistency 6.competitive analysis. Only one point 20 words max per topic."},
                {
                "type": "image_url",
                "image_url": {
                    "url": base64_image_url
                },
                },
            ],
            }
        ],
        max_tokens=300,
    )

    return response.choices[0].message.content or ''

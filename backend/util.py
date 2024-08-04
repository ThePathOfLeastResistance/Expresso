from openai import OpenAI

from api_key import api_key
client = OpenAI(api_key=api_key)

def image_analysis(base64_image_url: str, option: str):
    # ONLY FOR DEBUGGING
#     return """<h1>Visual Hierarchy/Composition/Layout</h1>
# Clear, readable layout with strong focal points; however, the QR code section looks cluttered.
# <br/>
# <h1>Colour/Contrast</h1>
# Blue and white theme is consistent and professional, enhancing visibility and readability.
# <br/>
# <h1>Text/Font</h1>
# The font is clear and legible, though some areas could use varied weight for emphasis.
# <br/>
# <h1>Content Relevance/Marketability</h1>
# Highly relevant and appealing to target market of young students and educators; free classes are a strong draw.
# <br/>
# <h1>Branding and Consistency</h1>
# Strong, consistent branding with the logo and color scheme maintained throughout the flyer.
# <br/>
# <h1>Competitive Analysis</h1>
# Lacks comparison or mention of unique selling points against competitors in the educational field."""

    intro = "This is an adobe express add-on aimed toward designers and marketers, to improve their productivity by providing constructive feedback telling them what they can change/improve. "
    if option == 'feedback':
        text = "Provide concise but detailed bullet point feedback about the attached design about: 1.visual hierarchy/composition/layout 2.colour/contrast 3.text/font 4.content relevance/marketability 5.branding and consistency 6.competitive analysis. Only one point 25 words max per topic. Do not use markdown, e.g. ## - instead use html, like <h1> wrapped around. Don't use the exact topics I gave you as titles. Make an extra <br/> between topic sections."
    elif option == 'description':
        text = "Provide a max 40 word description of the attached design to be put on a social media post to boost its engagement and marketability. Don't put tags."
    elif option == 'tags':
        text = "Provide a list of max 10 social media tags that can be captioned with the attached design to help boost its engagement and marketability. Format should be a space separated list of #tag"
    
    prompt = intro + text

    response = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=[
            {
            "role": "user",
            "content": [
                {"type": "text", "text": prompt},
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

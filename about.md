about_md = """---
layout: page
title: About
permalink: /about/
---

Hi, I’m **Joonsun Hwang**, a PhD student at Carnegie Mellon University in the Department of Civil and Environmental Engineering.

My research focuses on **Human-AI collaboration in infrastructure systems**, especially how to enhance decision-making, safety, and trust in high-risk domains like construction and nuclear energy. I integrate technologies such as **generative AI**, **knowledge graphs**, and **semantic modeling** to bridge gaps between human expertise and machine intelligence.

### Areas of Interest
- Human-AI decision modeling
- Infrastructure safety and maintenance
- Generative AI in AEC (Architecture, Engineering, Construction)
- Nuclear microreactors and regulatory mapping

You can learn more about my work through the [CV](/cv/) page or check out my recent publications on [Google Scholar](https://scholar.google.com/).

Feel free to reach out via [email](mailto:joonsunh@andrew.cmu.edu).
"""

about_path = "/mnt/data/about.md"
with open(about_path, "w", encoding="utf-8") as f:
    f.write(about_md)

about_path

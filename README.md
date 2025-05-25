# hjunsun.github.io

This is the personal academic website of **Joonsun Hwang**, hosted with GitHub Pages and built using the [Hyde](https://github.com/poole/hyde) Jekyll theme.

## 🔧 Structure

- `index.html` – Main page with CV summary and blog posts
- `about.md` – About page
- `cv.md` – Full curriculum vitae (optional)
- `_posts/` – Jekyll blog posts
- `_layouts/`, `_includes/` – Jekyll layout templates
- `_config.yml` – Jekyll site settings
- `Gemfile`, `Gemfile.lock` – Ruby gem dependencies
- `CNAME` – (Optional) for custom domain

## ▶️ How to Run Locally

1. Install Ruby (3.1.x recommended) and Bundler  
2. Clone the repository

```bash
git clone https://github.com/your-username/hjunsun.github.io.git
cd hjunsun.github.io
```

3. Install dependencies

```bash
bundle install
```

4. Serve the site

```bash
bundle exec jekyll serve
```

5. Open `http://127.0.0.1:4000/` in your browser

## 🪄 Customize

- To change the sidebar: edit `_includes/sidebar.html`
- To change site config: edit `_config.yml`
- To add posts: create new `.md` files in `_posts/` (follow `YYYY-MM-DD-title.md` format)

## 📄 License

This project is MIT licensed.

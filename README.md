# Machine Learning Knowledge System

An Obsidian-first learning library for Supervised and Unsupervised Learning, published as a static GitHub Pages site.

## What is published

- Curated Markdown and DOCX-derived study notes
- Topic outlines for source-only lessons
- Glossary definitions, formulas, learning cards, and concept relationships
- Necessary explanatory images
- Obsidian MOCs, wiki-links, graph metadata, and Canvas

Raw course PDFs, videos, transcripts, ZIP archives, Google credentials, and local filesystem paths are not published.

## Obsidian

Open the `vault/` directory as an Obsidian vault. Start at `Home.md` or `Machine Learning Big Picture.canvas`.

## Build

```bash
ML_SOURCE_ROOT="/path/to/Machine Learning" python3 scripts/build_library.py
```

The generated static site is written to `docs/` for GitHub Pages.

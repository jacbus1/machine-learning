#!/usr/bin/env python3
"""Build the public notes site and Obsidian vault without publishing source media."""

from __future__ import annotations

import hashlib
import html
import json
import os
import re
import shutil
import unicodedata
import zipfile
from collections import Counter
from pathlib import Path
from xml.etree import ElementTree as ET


REPO = Path(__file__).resolve().parents[1]
DOCS = REPO / "docs"
DATA = DOCS / "data"
ASSETS = DOCS / "assets"
VAULT = REPO / "vault"
SOURCE_ROOT_VALUE = os.environ.get("ML_SOURCE_ROOT", "")
SOURCE_ROOT = Path(SOURCE_ROOT_VALUE).expanduser() if SOURCE_ROOT_VALUE else Path()
STUDY = SOURCE_ROOT / "data-science-study"
COURSES = {
    "supervised": SOURCE_ROOT / "Supervised Learning",
    "unsupervised": SOURCE_ROOT / "Unsupervised Learning",
}
MEDIA = {".mp4", ".mov", ".m4v", ".avi", ".mkv", ".webm", ".wmv", ".flv"}
IMAGES = {".png", ".jpg", ".jpeg", ".webp"}

UNSUPERVISED_GLOSSARY = [
    ("unsupervised-learning", "Unsupervised Learning", ["非監督式學習"], "在沒有已知答案標籤的資料中尋找結構、群組、低維表示或異常模式。", "它把問題從預測已知目標，轉成理解資料本身的形狀與組織。", ["pca", "k-means", "hierarchical-clustering"]),
    ("clustering", "Clustering", ["分群"], "按照樣本間的相似性，把資料組織成內部相近、彼此相異的群組。", "分群提供沒有既定標籤時的探索結構。", ["k-means", "gmm", "hierarchical-clustering"]),
    ("standardization", "Standardization", ["標準化", "z-score scaling"], "把數值轉換為以平均數零、標準差一為尺度的表示。", "距離型與變異型方法會受尺度影響，因此 PCA 和 K-means 前常需標準化。", ["pipeline", "pca", "k-means"]),
    ("latent-variable", "Latent Variable", ["潛在變數"], "不能直接觀察、但用來解釋觀察資料結構的隱藏變數。", "GMM component 與 topic assignment 都可以視為 latent variables。", ["gmm", "expectation-maximization", "lda"]),
    ("isolation-forest", "Isolation Forest", ["孤立森林"], "利用隨機切分使異常點通常以較短路徑被孤立的樹模型。", "它能在高維資料中有效執行無監督異常偵測。", ["anomaly-detection", "machine-learning"]),
    ("dimensionality-reduction", "Dimensionality Reduction", ["降維"], "用較少的變數表示高維資料，同時盡量保留重要結構。", "它讓資料更容易視覺化、壓縮、去噪與建模。", ["pca", "svd", "isomap"]),
    ("pca", "Principal Component Analysis (PCA)", ["主成分分析"], "找出彼此正交、且依序捕捉最大資料變異的線性方向。", "PCA 把相關特徵重新表示為少量 principal components。", ["principal-component", "pca-loading", "pca-score", "svd"]),
    ("principal-component", "Principal Component", ["PC", "主成分"], "由原始特徵線性組合而成的新軸；PC1 捕捉最大變異，後續主成分依序捕捉剩餘變異。", "它是 PCA 新座標系中的方向。", ["pca", "pca-loading", "pca-score"]),
    ("pca-loading", "PCA Loading", ["loading", "負荷量"], "描述每個原始特徵在某條 principal component 方向上的權重。", "loading 用來解釋一條主成分主要由哪些特徵構成。", ["principal-component", "pca-score"]),
    ("pca-score", "PCA Score", ["score", "主成分分數"], "樣本投影到 principal component 後得到的新座標。", "score plot 顯示樣本在低維空間中的相對位置。", ["pca", "pca-loading"]),
    ("svd", "Singular Value Decomposition (SVD)", ["奇異值分解"], "把矩陣分解為左右奇異向量與奇異值，揭示主要方向與尺度。", "SVD 是 PCA、低秩近似與缺失值方法的重要計算基礎。", ["matrix", "pca", "dimensionality-reduction"]),
    ("k-means", "K-means Clustering", ["K 均值分群"], "反覆進行樣本指派與中心更新，把資料分成 K 個群組。", "它以降低群內平方距離為目標，適合近似球狀且尺度可比較的群組。", ["wcss", "clustering", "standardization"]),
    ("wcss", "Within-Cluster Sum of Squares (WCSS)", ["群內平方和"], "計算每個樣本到所屬群中心的平方距離總和。", "它是 K-means 的最佳化目標，也可用於 elbow method。", ["k-means", "loss-function"]),
    ("gmm", "Gaussian Mixture Model (GMM)", ["高斯混合模型"], "假設資料由多個 Gaussian components 混合產生，並為每個樣本給出軟性群組機率。", "它比硬式 K-means 更能表示重疊與不同形狀的群組。", ["gaussian-distribution", "expectation-maximization", "clustering"]),
    ("expectation-maximization", "Expectation-Maximization (EM)", ["EM algorithm", "期望最大化"], "交替估計隱藏群組責任與更新模型參數的迭代方法。", "EM 常用來估計 GMM 等含有 latent variables 的模型。", ["gmm", "latent-variable"]),
    ("hierarchical-clustering", "Hierarchical Clustering", ["階層式分群"], "依距離與 linkage 規則逐步合併或拆分群組，形成階層結構。", "它不必先固定唯一群數，並能用 dendrogram 檢視不同尺度的群組。", ["dendrogram", "linkage", "clustering"]),
    ("dendrogram", "Dendrogram", ["樹狀圖"], "顯示階層式分群中群組合併順序與距離的樹狀圖。", "在不同高度切割 dendrogram，可以得到不同數量的 clusters。", ["hierarchical-clustering", "linkage"]),
    ("linkage", "Linkage Criterion", ["連結準則"], "定義兩個 clusters 之間距離的規則，例如 single、complete 與 average linkage。", "不同 linkage 會產生不同群組形狀與對離群值的敏感度。", ["hierarchical-clustering", "dendrogram"]),
    ("tsne", "t-SNE", ["t-distributed Stochastic Neighbor Embedding"], "以非線性方式把高維資料映射到低維，優先保留局部鄰近關係。", "它適合探索式視覺化，但群間距離與群大小不應直接作定量解讀。", ["dimensionality-reduction", "pca"]),
    ("isomap", "Isomap", [], "以鄰居圖上的 geodesic distance 保留非線性流形結構，再進行低維嵌入。", "它能捕捉線性 PCA 無法表示的彎曲低維結構。", ["dimensionality-reduction", "mds"]),
    ("mds", "Multidimensional Scaling (MDS)", ["多維尺度分析"], "從樣本間距離或相異度建立低維座標，使低維距離盡量重現原始關係。", "MDS 適合在只有 pairwise distances 時建立視覺表示。", ["dimensionality-reduction", "isomap"]),
    ("anomaly-detection", "Anomaly Detection", ["異常偵測"], "辨識相對於大多數資料模式顯著不同的樣本。", "它用於風險、故障、欺詐與資料品質監控。", ["isolation-forest", "unsupervised-learning"]),
    ("topic-modeling", "Topic Modeling", ["主題模型"], "從大量文字中找出潛在主題，以及文件對各主題的混合比例。", "它提供沒有人工標籤時的語料探索與摘要結構。", ["lda", "unsupervised-learning"]),
    ("lda", "Latent Dirichlet Allocation (LDA)", ["潛在狄利克雷分配"], "把每份文件表示為主題混合，並把每個主題表示為詞彙機率分布的生成模型。", "LDA 是經典的 probabilistic topic modeling 方法。", ["topic-modeling", "latent-variable"]),
]


def extend_glossary(glossary: dict) -> None:
    categories = glossary.setdefault("categories", [])
    known_categories = {item.get("id") for item in categories}
    for category in [
        {"id": "representation", "label": "Representation", "description": "降維、矩陣分解與低維表示"},
        {"id": "clustering", "label": "Clustering & Discovery", "description": "群組、異常與潛在結構"},
    ]:
        if category["id"] not in known_categories:
            categories.append(category)
    entries = glossary.setdefault("entries", [])
    known = {item.get("id") for item in entries}
    for item_id, term, aliases, definition, why, related in UNSUPERVISED_GLOSSARY:
        if item_id in known:
            continue
        category = "representation" if item_id in {"dimensionality-reduction", "pca", "principal-component", "pca-loading", "pca-score", "svd", "tsne", "isomap", "mds"} else "clustering"
        entries.append({"id": item_id, "term": term, "aliases": aliases, "category": category, "definition": definition, "why": why, "module": "Unsupervised Learning", "unitId": "unsupervised-learning", "related": related})
    picture = glossary.setdefault("bigPicture", {"nodes": []})
    if not any(node.get("id") == "discover" for node in picture.get("nodes", [])):
        picture["nodes"].insert(3, {"id": "discover", "number": "04", "title": "Discover structure", "subtitle": "沒有 label 時理解資料", "description": "用 PCA、clustering 與 latent models 找出低維表示、群組與異常。", "glossaryIds": ["unsupervised-learning", "pca", "k-means", "gmm", "hierarchical-clustering", "anomaly-detection"]})
        for index, node in enumerate(picture["nodes"], 1):
            node["number"] = str(index).zfill(2)


def slug(value: str) -> str:
    value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode().lower()
    value = re.sub(r"[^a-z0-9]+", "-", value).strip("-")
    return value or hashlib.sha1(value.encode()).hexdigest()[:10]


def module_number(name: str) -> int:
    match = re.search(r"(\d+)", name)
    return int(match.group(1)) if match else 999


def docx_text(path: Path) -> str:
    try:
        with zipfile.ZipFile(path) as archive:
            root = ET.fromstring(archive.read("word/document.xml"))
        ns = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
        paragraphs = []
        for paragraph in root.iter(ns + "p"):
            text = "".join(node.text or "" for node in paragraph.iter(ns + "t")).strip()
            if text:
                paragraphs.append(text)
        return "\n\n".join(paragraphs)
    except Exception:
        return ""


def compact_markdown(text: str) -> str:
    text = text.replace("\r\n", "\n").replace("\r", "\n").replace("\x00", "")
    text = re.sub(r"\n{4,}", "\n\n\n", text)
    return text.strip()


def infer_tags(title: str) -> list[str]:
    lowered = title.lower()
    rules = {
        "regression": ["regression", "prediction"],
        "classification": ["classification"],
        "probability": ["probability", "statistics"],
        "calculus": ["calculus", "mathematics"],
        "linear algebra": ["linear-algebra", "mathematics"],
        "pca": ["pca", "dimensionality-reduction"],
        "singular value": ["svd", "linear-algebra"],
        "svd": ["svd", "linear-algebra"],
        "cluster": ["clustering"],
        "k-means": ["k-means", "clustering"],
        "gaussian mixture": ["gmm", "clustering"],
        "tree": ["decision-trees"],
        "forest": ["random-forest", "ensemble"],
        "boost": ["boosting", "ensemble"],
        "bagging": ["bagging", "ensemble"],
        "diagnostic": ["diagnostics", "evaluation"],
        "evaluation": ["evaluation"],
        "anomaly": ["anomaly-detection"],
        "isomap": ["manifold-learning"],
        "multidimensional scaling": ["mds", "dimensionality-reduction"],
        "latent dirichlet": ["lda", "topic-modeling"],
    }
    tags = []
    for needle, values in rules.items():
        if needle in lowered:
            tags.extend(values)
    return sorted(set(tags or ["machine-learning"]))


def generic_outline(title: str, course: str) -> str:
    tags = infer_tags(title)
    focus = ", ".join(tag.replace("-", " ") for tag in tags[:3])
    return (
        f"## Overview\n\n"
        f"**{title}** 是 {course.title()} Learning 路徑中的一個主題，主要連結到 {focus}。"
        "這一頁先建立分類與學習位置；後續可在 Obsidian 中持續補充自己的推導、例子與問題。\n\n"
        "## Learning checklist\n\n"
        "- 說明這個方法要解決的資料問題。\n"
        "- 列出輸入、輸出與核心假設。\n"
        "- 用一個小例子走完整個流程。\n"
        "- 記錄適用情境、限制與常見誤解。\n"
        "- 與相鄰主題比較，建立選擇方法的判斷準則。\n"
    )


def select_note_content(topic: Path, course: str) -> tuple[str, str, list[str]]:
    files = [p for p in topic.rglob("*") if p.is_file() and not p.name.startswith("~$")]
    markdown = sorted((p for p in files if p.suffix.lower() == ".md"), key=lambda p: p.stat().st_size, reverse=True)
    documents = sorted((p for p in files if p.suffix.lower() == ".docx"), key=lambda p: p.stat().st_size, reverse=True)
    source_names = [p.name for p in files if p.suffix.lower() not in MEDIA and not p.name.startswith(".")]
    if markdown:
        chosen = markdown[:4]
        sections = []
        for path in chosen:
            body = compact_markdown(path.read_text("utf-8", errors="ignore"))
            body = re.sub(r"^---\n.*?\n---\n", "", body, count=1, flags=re.S)
            if body:
                sections.append(f"## {path.stem}\n\n{body}")
        return "curated", "\n\n".join(sections), source_names
    if documents:
        chosen = documents[:3]
        sections = []
        for path in chosen:
            body = compact_markdown(docx_text(path))
            if body:
                sections.append(f"## {path.stem}\n\n{body}")
        if sections:
            return "curated", "\n\n".join(sections), source_names
    text_files = [p for p in files if p.suffix.lower() in {".txt", ".vtt"}]
    if text_files:
        return "outline", generic_outline(topic.name, course), source_names
    return "source-index", generic_outline(topic.name, course), source_names


def copy_image(source: Path) -> str | None:
    candidate = source
    if not candidate.exists():
        raw = str(source)
        raw = raw.replace("/Machine Learning/Module1/", "/Machine Learning/Supervised Learning/Module1/")
        raw = raw.replace("/Machine Learning/Module2/", "/Machine Learning/Supervised Learning/Module2/")
        candidate = Path(raw)
    if not candidate.exists() or candidate.suffix.lower() not in IMAGES:
        return None
    digest = hashlib.sha256(candidate.read_bytes()).hexdigest()[:10]
    filename = f"{digest}-{slug(candidate.stem)[:70]}{candidate.suffix.lower()}"
    destination = ASSETS / filename
    if not destination.exists():
        shutil.copy2(candidate, destination)
    return f"assets/{filename}"


def sanitize(value, key: str = ""):
    if isinstance(value, dict):
        return {k: sanitize(v, k) for k, v in value.items()}
    if isinstance(value, list):
        return [sanitize(item, key) for item in value]
    if isinstance(value, str) and value.startswith("/"):
        source = Path(value)
        if key == "path" and source.suffix.lower() in IMAGES:
            copied = copy_image(source)
            return copied or source.name
        return source.name
    return value


def write_json(path: Path, value) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", "utf-8")


def build_existing_notes() -> tuple[list[dict], list[dict]]:
    ASSETS.mkdir(parents=True, exist_ok=True)
    articles = sanitize(json.loads((STUDY / "site/articles.json").read_text("utf-8")))
    module1 = sanitize(json.loads((STUDY / "site/module1.json").read_text("utf-8")))
    module2 = sanitize(json.loads((STUDY / "site/module2.json").read_text("utf-8")))
    for unit in module1.get("units", []):
        if unit.get("pdf"):
            unit["pdf"] = None
    glossary = json.loads((STUDY / "site/glossary.json").read_text("utf-8"))
    extend_glossary(glossary)
    course_order = json.loads((STUDY / "config/course-order.json").read_text("utf-8"))
    write_json(DATA / "articles.json", articles)
    write_json(DATA / "module1.json", module1)
    write_json(DATA / "module2.json", module2)
    write_json(DATA / "glossary.json", glossary)
    write_json(DATA / "course-order.json", course_order)
    visuals = {}
    for root in (articles, module1, module2):
        def walk(item):
            if isinstance(item, dict):
                path = item.get("path")
                if isinstance(path, str) and path.startswith("assets/"):
                    visuals[path] = {
                        "path": path,
                        "relativePath": item.get("relativePath") or Path(path).name,
                        "extension": Path(path).suffix,
                        "module": item.get("module", "Module 1–2"),
                    }
                for child in item.values():
                    walk(child)
            elif isinstance(item, list):
                for child in item:
                    walk(child)
        walk(root)
    sources = sorted(visuals.values(), key=lambda item: item["relativePath"])
    write_json(DATA / "sources.json", sources)
    return glossary.get("entries", []), articles


def build_unit() -> list[dict]:
    unit_root = STUDY / "units/simple-linear-regression"
    lessons = []
    for path in sorted((unit_root / "teaching").glob("*.md")):
        markdown = path.read_text("utf-8")
        title = markdown.splitlines()[0].lstrip("# ").strip()
        lessons.append({"id": path.stem, "title": title, "markdown": markdown})
    unit = {
        "slug": "simple-linear-regression",
        "title": "Simple Linear Regression",
        "status": "curated",
        "learningPath": "Linear Models",
        "prerequisites": ["supervised-learning", "feature-and-target"],
        "lessons": lessons,
    }
    catalog = [{k: v for k, v in unit.items() if k != "lessons"} | {"lessonCount": len(lessons)}]
    write_json(DATA / "catalog.json", catalog)
    write_json(DATA / "units/simple-linear-regression.json", unit)
    return catalog


def note_frontmatter(record: dict) -> str:
    tags = "\n".join(f"  - {tag}" for tag in record["tags"])
    return (
        "---\n"
        f"course: {record['course']}\n"
        f"module: {record['module']}\n"
        f"status: {record['status']}\n"
        "tags:\n"
        f"{tags}\n"
        "publish: true\n"
        "---\n"
    )


def build_vault() -> list[dict]:
    if VAULT.exists():
        shutil.rmtree(VAULT)
    (VAULT / ".obsidian").mkdir(parents=True)
    write_json(VAULT / ".obsidian/app.json", {"showInlineTitle": True, "alwaysUpdateLinks": True})
    write_json(VAULT / ".obsidian/graph.json", {"collapse-filter": False, "showTags": True, "showAttachments": False})
    records = []
    for course_key, root in COURSES.items():
        course_title = "Supervised Learning" if course_key == "supervised" else "Unsupervised Learning"
        modules = sorted((p for p in root.iterdir() if p.is_dir() and p.name.lower().startswith("module")), key=lambda p: module_number(p.name))
        for module in modules:
            number = module_number(module.name)
            topics = sorted((p for p in module.iterdir() if p.is_dir()), key=lambda p: p.name.casefold())
            for index, topic in enumerate(topics, 1):
                status, body, sources = select_note_content(topic, course_key)
                record = {
                    "id": f"{course_key}-m{number}-{slug(topic.name)}",
                    "course": course_title,
                    "courseKey": course_key,
                    "module": number,
                    "moduleLabel": f"Module {number}",
                    "order": index,
                    "title": topic.name.strip(),
                    "status": status,
                    "tags": [course_key, f"module-{number}", *infer_tags(topic.name)],
                    "sourceTypes": sorted({p.suffix.lower().lstrip(".") for p in topic.rglob("*") if p.is_file() and p.suffix and not p.name.startswith(".") and p.suffix.lower() not in MEDIA}),
                    "sourceCount": len(sources),
                    "body": body,
                }
                records.append(record)
    by_module = {}
    for record in records:
        by_module.setdefault((record["courseKey"], record["module"]), []).append(record)
    for (course_key, number), items in by_module.items():
        course_title = items[0]["course"]
        folder = VAULT / course_title / f"Module {number}"
        folder.mkdir(parents=True, exist_ok=True)
        for index, record in enumerate(items):
            previous = items[index - 1]["title"] if index else None
            following = items[index + 1]["title"] if index + 1 < len(items) else None
            links = [f"[[{course_title} MOC]]", f"[[{course_title} - Module {number} MOC]]"]
            if previous:
                links.append(f"[[{previous}]]")
            if following:
                links.append(f"[[{following}]]")
            note = (
                note_frontmatter(record)
                + f"\n# {record['title']}\n\n"
                + f"> [!info] Learning position\n> {course_title} → Module {number} → Topic {record['order']}\n\n"
                + record["body"]
                + "\n\n## Connections\n\n"
                + " · ".join(links)
                + "\n"
            )
            (folder / f"{record['title']}.md").write_text(note, "utf-8")
        moc = f"---\ntags: [moc, {course_key}, module-{number}]\n---\n\n# {course_title} - Module {number} MOC\n\n"
        moc += "\n".join(f"{i + 1}. [[{record['title']}]] — `{record['status']}`" for i, record in enumerate(items)) + "\n"
        (folder / f"{course_title} - Module {number} MOC.md").write_text(moc, "utf-8")
    for course_key in COURSES:
        title = "Supervised Learning" if course_key == "supervised" else "Unsupervised Learning"
        items = [record for record in records if record["courseKey"] == course_key]
        modules = sorted({record["module"] for record in items})
        text = f"---\ntags: [moc, {course_key}]\n---\n\n# {title} MOC\n\n"
        text += "\n".join(f"- [[{title} - Module {number} MOC]]" for number in modules) + "\n"
        (VAULT / title / f"{title} MOC.md").write_text(text, "utf-8")
    home = """---
tags: [moc, big-picture]
---

# Machine Learning Knowledge Vault

## Learning paths

- [[Supervised Learning MOC]]
- [[Unsupervised Learning MOC]]

```mermaid
flowchart LR
  A[Data & Problem] --> B[Representation]
  B --> C[Supervised Learning]
  B --> D[Unsupervised Learning]
  C --> E[Prediction & Inference]
  D --> F[Structure & Representation]
  E --> G[Evaluation & Trust]
  F --> G
```
"""
    (VAULT / "Home.md").write_text(home, "utf-8")
    build_canvas(records)
    write_json(DATA / "topics.json", {"version": 1, "topics": records})
    return records


def build_canvas(records: list[dict]) -> None:
    nodes = []
    edges = []
    root_id = "machine-learning"
    nodes.append({"id": root_id, "type": "text", "text": "# Machine Learning\nSupervised + Unsupervised", "x": 0, "y": 0, "width": 300, "height": 130, "color": "4"})
    for course_index, course_key in enumerate(("supervised", "unsupervised")):
        course_records = [r for r in records if r["courseKey"] == course_key]
        course_title = course_records[0]["course"]
        course_id = course_key
        course_x = -520 if course_index == 0 else 520
        nodes.append({"id": course_id, "type": "text", "text": f"# {course_title}\n{len(course_records)} topics", "x": course_x, "y": 220, "width": 300, "height": 110, "color": "5" if course_index == 0 else "6"})
        edges.append({"id": f"e-{root_id}-{course_id}", "fromNode": root_id, "fromSide": "bottom", "toNode": course_id, "toSide": "top"})
        for module_index, number in enumerate(sorted({r["module"] for r in course_records})):
            module_id = f"{course_key}-m{number}"
            module_records = [r for r in course_records if r["module"] == number]
            x = course_x + (module_index - 2) * 230
            y = 500
            nodes.append({"id": module_id, "type": "text", "text": f"## Module {number}\n{len(module_records)} topics", "x": x, "y": y, "width": 190, "height": 90, "color": "3"})
            edges.append({"id": f"e-{course_id}-{module_id}", "fromNode": course_id, "fromSide": "bottom", "toNode": module_id, "toSide": "top"})
    write_json(VAULT / "Machine Learning Big Picture.canvas", {"nodes": nodes, "edges": edges})


def build_search(glossary_entries: list[dict], articles: list[dict], topics: list[dict]) -> None:
    records = []
    for entry in glossary_entries:
        records.append({
            "id": f"glossary:{entry['id']}", "type": "glossary", "label": "Glossary",
            "title": entry["term"], "text": " ".join([entry.get("definition", ""), entry.get("why", "")]),
            "aliases": entry.get("aliases", []), "module": entry.get("module", ""),
            "route": f"#glossary/{entry['id']}",
        })
    for article in articles:
        text = " ".join(section.get("heading", "") + " " + " ".join(section.get("paragraphs", [])) for section in article.get("sections", []))
        records.append({
            "id": f"article:{article['id']}", "type": "article", "label": "Article",
            "title": article.get("title", ""), "text": text, "module": article.get("module", "Module 1–2"),
            "unit": article.get("unit", ""), "route": f"#sources/{article['id']}",
        })
    for topic in topics:
        records.append({
            "id": f"topic:{topic['id']}", "type": "topic", "label": "Topic",
            "title": topic["title"], "text": topic["body"], "module": f"{topic['course']} · Module {topic['module']}",
            "unit": topic["status"], "route": f"#topics/{topic['id']}",
        })
    write_json(DATA / "search-index.json", {"version": 1, "records": records})


def main() -> None:
    if not SOURCE_ROOT_VALUE:
        raise SystemExit("Set ML_SOURCE_ROOT to the local folder containing data-science-study and the two course folders.")
    DATA.mkdir(parents=True, exist_ok=True)
    glossary, articles = build_existing_notes()
    build_unit()
    topics = build_vault()
    build_search(glossary, articles, topics)
    for source in DATA.glob("*.source.json"):
        source.unlink()
    print(f"Built {len(topics)} topic notes, {len(glossary)} glossary entries, {len(articles)} articles, and {len(list(ASSETS.glob('*')))} images.")


if __name__ == "__main__":
    main()

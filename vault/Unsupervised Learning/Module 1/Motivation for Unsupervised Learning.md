---
course: Unsupervised Learning
module: 1
status: curated
tags:
  - unsupervised
  - module-1
  - machine-learning
publish: true
---

# Motivation for Unsupervised Learning

> [!info] Learning position
> Unsupervised Learning → Module 1 → Topic 4

## Motivation_for_Unsupervised_Learning_超詳細學習筆記

COURSE NOTES

Motivation forUnsupervised Learning

非監督式學習：動機、核心概念、Scaling、PCA、Clustering 與探索式思維

University of Colorado Boulder · Introduction to Machine Learning — Unsupervised Learning

學習目標  真正理解「沒有 Y」如何改變整個 Machine Learning 問題：從 prediction 轉向 discovery；並建立後續 PCA、K-means、Hierarchical Clustering 的完整概念地圖。

整理依據：PDF 12 頁 + Video + Transcript + Master Study Prompt v3

資料來源與閱讀方式

本筆記以課程 PDF 作為主要結構，逐頁對照影片與 transcript；對重要 graph / diagram 額外拆解 axis、點、形狀、因果關係與實際解讀。所有補充若不是 PDF 的正式公式，會明確標示為「理解用補充」。

材料

用途

Motivation for Unsupervised Learning.pdf

12 頁課程結構、圖表、workflow、例子與 summary。

240P Motivation for Unsupervised Learning.mp4

老師口頭強調、實際 slide 出現順序、補充直覺。

Motivation for Unsupervised Learning.txt

影片逐字稿；用來補充口頭解釋與比對可能 transcription error。

Data Science Master Study Prompt v3

規定所有 concept、公式、graph、comparison、Q&A、active recall 的拆解方式。

重要比對結果  影片實際播放並詳細講解的內容主要對應 PDF P2、P3、P4、P5、P6、P9、P10、P12；PDF P7（USArrests）、P8（NCI60）與 P11（Exploratory Approach）是 PDF 額外的重要視覺教材。

筆記目錄

1. Big Picture：這一課到底在學什麼？

2. Learning Flow

3. Concept-by-Concept Detailed Explanation

4. Formula / Notation + Complete Symbol Dictionary

5. Numerical Example

6. Cause-and-Effect Chains

7. PDF / Video Page-by-Page Deep Analysis

8. PDF vs Video Complementary Content

9. Comparison Tables

10. ML Concept Map

11. 12 張 Study Cards 規劃

12. 20 條 Concept Q&A Flashcards

13. Active Recall Questions

14. 6 段完整總結

15. 15 句必記精華

16. Do I Really Understand? Checklist

1. Big Picture：這一課到底在學什麼？

一句話定義  Unsupervised Learning（非監督式學習）是在沒有已知答案 Y 的情況下，只從資料 X 中尋找 structure、patterns、groups 和主要 variation。

你之前學的 Supervised Learning（監督式學習）通常有 inputs X 及已知 outcomes Y，因此可以學習 X → Y 的關係，再用 Accuracy、MSE、AUC 等指標比較 prediction 與真實答案。這一課開始改變問題：資料仍然有 X，但沒有 Y；模型的任務不再主要是「預測正確答案」，而是「發現資料本身的結構」。

Supervised Learning 的典型流程

X + Y

↓

Train model

↓

Learn X → Y relationship

↓

Predict Y

↓

Compare prediction with true Y

↓

Accuracy / MSE / AUC

Unsupervised Learning 的典型流程

Only X

↓

No correct label Y

↓

Explore structure

↓

Measure similarity / variation

↓

PCA / Clustering

↓

Validate discovered patterns

↓

Interpret with domain knowledge

↓

Iterate

最重要思維轉換  Supervised Learning 問「我能否預測 Y？」；Unsupervised Learning 問「X 本身有什麼結構值得發現？」

2. Learning Flow

這一課建立整門 Unsupervised Learning 的 roadmap。先從 EDA、distance、scaling 打基礎，再分成 PCA（降維）與 clustering（分群），最後以 internal validation、stability、interpretability、usefulness 來判斷結果。

Raw Unlabeled Data X

↓

EDA / Data Exploration

↓

Distance + Scaling

↓

PCA ↔ Clustering

↓

Visualization / Structure Discovery

↓

Internal Validation

↓

Stability

↓

Domain Interpretation

↓

Useful Insight

↓

Iterate

課程工具箱 Roadmap（PDF P4）

階段

核心內容

你應該問的問題

Foundations

Distance metrics · EDA · Scaling

資料尺度合理嗎？「相似」要如何量化？

PCA

Dimensionality · Variance · Visualization

哪些新方向最能代表資料的主要變化？

K-Means

Partitioning · Elbow method · Interpretation

資料可分成多少群？每群代表什麼？

Hierarchical Clustering

Dendrogram · Linkage · Comparison

observations 有沒有層級式的相似關係？

3. Concept-by-Concept Detailed Explanation

Concept 1 — Unsupervised Learning｜非監督式學習

一句話定義

只有 input features，沒有預先提供的 target labels，讓 algorithm 從資料本身尋找 structure。

正式定義

Unsupervised learning refers to methods that analyze observations described by feature variables X when no target variable Y is supplied for training. The objective is typically representation, grouping, similarity discovery, or exploratory structure detection rather than direct prediction of a labeled outcome.

超簡單例子

Student

Study Hours

Attendance

Homework

A

8

95

90

B

7

92

88

C

2

45

40

D

3

50

45

這裡沒有 Pass / Fail label。Algorithm 可能發現 A、B 很相似，而 C、D 很相似，形成兩個 clusters。但 Cluster 1 並不「天生等於好學生」；「好學生」是人類在觀察 cluster characteristics 後所做的 interpretation。

常見誤解  Clustering 找到的群組名稱不是資料自帶的真實類別。Algorithm 通常只提供 group structure；群組的商業／科學含義需要人解釋。

Concept 2 — Label / Outcome / Ground Truth｜標籤／結果／真實答案

Supervised Learning:  (X, Y)        Unsupervised Learning:  X

在 supervised learning 中，Y 可以是 House Price、Fraud / Not Fraud、Spam / Not Spam、Pass / Fail 等 target。Unsupervised learning 的核心情況是：Y 不提供，因此沒有直接 ground truth 可以拿來計算 prediction error。

No Y

↓

No direct ground truth

↓

No direct prediction error

↓

Multiple possible structures

↓

Need validation + interpretation + domain knowledge

Concept 3 — Pattern / Structure Discovery｜模式／結構發現

Unsupervised learning 不一定做「預測」。它可用來回答不同類型的 exploratory questions：

問題類型

典型問題

方法方向

Groups

哪些 customers 自然形成幾群？

Clustering

Similarity

哪些 documents / observations 最相似？

Distance + Clustering

Main variation

成千上萬 variables 中主要變化方向是什麼？

PCA

Visualization

能否將 6,000 dimensions 壓縮到 2D/3D？

PCA / dimensionality reduction

Concept 4 — PCA｜Principal Component Analysis｜主成分分析

本課定位  這一課只講 PCA 的 motivation 和 intuition，尚未正式推導 covariance、eigenvector、eigenvalue 等數學。

老師將 PCA 描述為尋找新的 axes（Principal Components），這些 axes 用來捕捉資料中最主要的 variation。對 high-dimensional data，PCA 很常被用來做 2D / 3D visualization。

x₁, x₂, …, x₆₀₀₀   → PCA →   PC1, PC2, PC3, …

6000 original dimensions

↓

PCA

↓

PC1 + PC2

↓

2D scatter plot

↓

Visualize major structure

不要誤會  PCA 不是 classification，也不是 clustering。PCA 的核心功能是 dimensionality reduction / representation；之後可以再對 PCA representation 做 clustering。

Concept 5 — Clustering｜分群

Clustering 的核心問題是：「哪些 observations 彼此相似，可以形成自然 groups？」本課預告兩大家族：K-Means 與 Hierarchical Clustering。

K-Means

K-Means 將 observations partition 成 K 個 clusters。影片口頭預告它會盡量讓同一 cluster 裡的 observations 更接近，即降低 within-cluster variation。這一課尚未正式給出 objective function。

Hierarchical Clustering

Hierarchical clustering 不是只輸出幾個固定群，而是建立 nested / hierarchical relationship，最後通常用 dendrogram 顯示。P4 預告後續會學 linkage methods 與 dendrogram interpretation。

Concept 6 — Scaling｜特徵尺度調整

Scaling 是這一課最值得先吃透的 foundation 之一。Distance-based methods 對 feature numerical range 很敏感：大尺度變數即使沒有更重要，也可能在計算距離時佔絕大部分。

Feature

Example range

問題

Age

20–60

差異可能只有幾十

Annual Income

30,000–200,000

差異可能幾萬到十幾萬

Different units / ranges

↓

Large-scale feature contributes larger numeric differences

↓

Distance gets dominated

↓

Similarity becomes distorted

↓

PCA / clustering geometry can be misleading

↓

Scaling needed

重點  Numerically larger ≠ more important。數值較大可能只代表單位／量尺不同。

4. Formula / Notation + Complete Symbol Dictionary

4.1 本課核心 notation：X 與 Y

Supervised: (X, Y)              Unsupervised: X

Symbol

English

中文

意思

本課作用

X

Input / feature data

輸入／特徵資料

所有 observations 的 feature measurements

兩種 learning 都有

Y

Target / label / outcome

目標／標籤／結果

已知答案

supervised 有；典型 unsupervised 不提供

x

Feature value / input

單個輸入值

某 observation 的某個 feature value

構成 X

n

Number of observations

樣本數

有多少 rows / observations

USArrests n = 50

p

Number of features

特徵數

每個 observation 有多少 variables

USArrests p = 4；NCI60 約 p = 6000

Formula in Words

Supervised learning 有「問題 X」和「答案 Y」；unsupervised learning 只有資料 X，需要自己探索其中的 structure。

4.2 理解 Scaling 所需的 Euclidean Distance（理解用補充）

來源界線  下式不是本 PDF 正式推導的公式；它只用來幫你理解為什麼不同 scale 會影響 distance-based methods。

d(A,B) = √[(x₍A1₎ − x₍B1₎)² + (x₍A2₎ − x₍B2₎)²]

Symbol

English / 中文

意思

作用

d(A,B)

Distance / 距離

observation A 與 B 的距離

數值越小通常代表越相似

A, B

Observations / 觀測值

兩個資料點

要比較的兩個對象

x₍A1₎

Feature value

A 的第 1 個 feature

第一維度座標

x₍B1₎

Feature value

B 的第 1 個 feature

第一維度座標

(·)²

Squared difference / 平方差

將差異平方

避免正負抵銷並強調較大差異

√

Square root / 平方根

把 squared sum 開根

回到 distance 尺度

Step-by-Step

假設 Urban Population difference = 10，而 Assault difference = 100：

d = √(10² + 100²) = √10100 ≈ 100.5

100 的差異幾乎支配整個 distance。因此如果某 feature 只是因為單位較大，就會不合理地控制「誰和誰相似」。

5. Numerical Example：真正理解 Unsupervised Learning

假設銀行有 4 個 customers，只有交易行為資料，沒有 Fraud / Normal label：

Customer

Monthly Transactions

Avg Transaction ($)

A

50

1,000

B

45

900

C

5

80

D

7

100

X = [[50,1000], [45,900], [5,80], [7,100]]       (No Y)

一個 clustering algorithm 可能發現 A ≈ B、C ≈ D，形成兩群。但「Cluster 1 = suspicious」不是 algorithm 自動知道的事。你需要檢查 cluster characteristics，再用 AML / business domain knowledge 解釋。

Cluster result

↓

Inspect characteristics

↓

Use domain knowledge

↓

Interpret meaning

↓

Decide whether insight is useful

金融 / AML 直覺  在交易監控場景，unsupervised clustering 可以用來探索客群／行為型態，但 cluster 並不等於已證實的 fraud class；若要判斷 fraud，需要其他 evidence、labels 或 investigative context。

6. Cause-and-Effect Chains

Chain 1 — 為什麼 evaluation 困難？

No labels Y

↓

No ground truth

↓

No direct prediction accuracy

↓

Multiple possible structures

↓

Multiple potentially valid solutions

↓

Need validation + interpretation

Chain 2 — 為什麼 scaling 必須？

Different feature units

↓

Different numerical ranges

↓

Large-scale feature dominates distance

↓

Similarity distorted

↓

Clustering / PCA may be misleading

↓

Scale features first

Chain 3 — 為什麼 PCA？

Number of features ↑↑

↓

Human visualization becomes impossible

↓

Need lower-dimensional representation

↓

PCA finds major variation directions

↓

Retain important structure

↓

Visualize in 2D / 3D

Chain 4 — 為什麼 workflow 要 Iterate？

Explore

↓

Find candidate patterns

↓

Validate stability / alternatives

↓

Interpret with domain knowledge

↓

Generate new questions

↓

Explore again

7. PDF / Video Page-by-Page Deep Analysis

Page 1 — Course Introduction & Unsupervised Learning Motivation

這一頁的功能是定位課程：它不是立即教演算法細節，而是建立「為什麼要學 unsupervised learning」的 worldview。Video title 使用 Motivation for Unsupervised Learning；PDF title 則是 Course Introduction & Unsupervised Learning Motivation，意思一致。

Transcript 注意  Transcript 開頭出現 “Introduction to Mature Learning” 與課程名稱不一致，應視為 speech-to-text transcription error；本筆記不把它當作課程正式術語。

One-sentence takeaway：這是一堂 motivation / conceptual framing 課，不是 formula derivation 課。

Page 2 — Contents of This Video

六個課程目標可以重新整理為一條邏輯鏈：What is it? → What tools? → Why useful? → What makes it difficult? → What datasets? → What mindset is required?

PDF item

真正要理解的問題

Unsupervised vs supervised

沒有 Y 後，ML 問題怎樣改變？

PCA and clustering

有哪些主要工具家族？

Applications

什麼實際場景需要 discovery 而不是 prediction？

Challenges

沒有 ground truth 時怎樣 validation？

Datasets

Scaling 與 high dimensionality 在真實資料怎樣出現？

Exploratory mindset

為何需要 explore → validate → interpret → iterate？

Video：約 00:22 進入此內容。

Page 3 — What Is Unsupervised Learning? ⭐

這是全課最重要的對照頁。左側 Supervised Learning：有 inputs X 和 known outputs Y，目標是 Predict Y from X；右側 Unsupervised Learning：只有 X，沒有 Y，目標是 Discover patterns and structure。

Supervised Learning

Unsupervised Learning

Have inputs X and known outputs Y

Have only inputs X; no labels Y

Goal: predict Y from X

Goal: discover patterns / structure

Examples: house price, spam, disease diagnosis

Examples: customer segments, high-dimensional visualization, similar documents

Clear success metric: prediction performance

Success more interpretation- and usefulness-driven

Video 約 01:21–03:09 對這頁補充 Accuracy、MSE、AUC 作 supervised examples；同時強調沒有 Y 後，不存在單一 prediction target。

Video representative screenshot ~01:30 — Supervised vs Unsupervised comparison

Transcript 需澄清  逐字稿有一句 “Success becomes much more objective.”，但 PDF 與前後文都明確指出 unsupervised evaluation 更 subjective / interpretation-driven，因此應視為口誤或 transcription error。

Common mistake：不要把「subjective」理解成「隨便」。沒有 ground truth 仍然需要 internal criteria、stability、domain sense、usefulness 等嚴謹 validation。

Page 4 — Core Techniques in Unsupervised Learning

P4 是整門課的 architecture：Foundations → PCA → K-Means → Hierarchical。它不是表示所有 project 必須嚴格按這個順序，而是表示後面的 concept 會建立在 distance、EDA、scaling 等 foundation 上。

Block

Keywords

深層含義

Foundations

Distance metrics · EDA · Scaling

先定義「相似」並避免尺度扭曲

PCA

Dimensionality · Variance · Visualization

用少數新 axes 表示主要 variation

K-Means

Partitioning · Elbow · Interpretation

將 observations 分成 K 群並思考 K 的選擇

Hierarchical

Dendrograms · Linkage · Comparison

建立 nested similarity structure

Video representative screenshot ~03:20 — Unsupervised toolkit roadmap

Page 5 — Real-World Motivating Examples

Customer Segmentation

Millions of customers

↓

No predefined customer type

↓

Purchase + browsing + demographics

↓

Clustering

↓

Behavior-based customer groups

↓

Targeted marketing / personalization

影片用 e-commerce / Amazon 作直覺例子。關鍵是：你不是先知道 VIP / bargain shopper 等 label 再做 classifier，而是先讓 data 顯示可能存在什麼 groups。

Document Organization

Large corpus of documents

↓

High-dimensional text features

↓

Dimensionality reduction

↓

Clustering

↓

Topic-like organization

↓

Recommendation / literature review

這頁第一次明確展示方法可以串聯：先 dimensionality reduction，再 clustering。

Video representative screenshot ~05:10 — Customer segmentation and document organization

Page 6 — Key Differences from Supervised Learning ⭐

Supervised learning 有客觀 performance measure，例如 Accuracy = 0.95；unsupervised learning 即使有 internal metric，例如 Silhouette = 0.45，也不能離開資料與 domain context 就宣稱「一定好」或「一定差」。

Validation dimension

問題

意義

Internal criteria

Variance explained / cluster cohesion 如何？

從資料結構本身評估

Stability

不同 run / perturbation 結果是否一致？

避免把偶然結果當成結構

Interpretability

pattern 是否符合 domain sense？

結果能否合理解釋

Usefulness

findings 是否真的支持 decision？

是否有實際價值

Silhouette = 0.45 的正確讀法  它是一個訊號，不是脫離 context 的最終判決。要配合 dataset、cluster goal、alternative methods、stability 與 domain interpretation。

Page 7 — Example Dataset: USArrests ⭐⭐⭐

這頁是 PDF-only 的重要視覺教材。資料為 50 US states × 4 features：Murder、Assault、Rape（crime rates）與 Urban Population (%)。核心 lesson 是：features 的 units / ranges 不同，distance-based methods 前通常要 scaling。

PDF Page 7 — USArrests: feature distributions and scale differences

左圖：Feature Distributions / Boxplots

X-axis 是 Murder、Assault、UrbanPop、Rape 四個 features；Y-axis 是 raw Value。最重要的解讀不是哪一個 feature「更重要」，而是它們的 numerical ranges 完全不同。Assault 可達數百，而 Murder、UrbanPop、Rape 的值域小得多。

Boxplot 元素

意思

Median line

中位數；資料一半在上、一半在下

Box

中間 50% observations 的範圍（Q1–Q3）

Whiskers

典型外圍範圍

Dots / circles

potential outliers

不同 box 的高度 / range

顯示 feature scale / distribution 差異

最大陷阱  Assault 的 raw values 大，不代表 Assault 在 substantive sense 上更重要；它可能只是量尺比較大。Distance algorithm 只看到數字，不會自動知道單位。

右圖：Urban Population vs Assault Scatter Plot

X-axis = Urban Population (%)；向右代表城市人口比例較高。Y-axis = Assault rate；向上代表 assault rate 較高。每個 dot = 一個 US state。圖中刻意展示兩個 axis 的量尺不同，提醒 distance calculation 對 scale 敏感。

Raw scales differ

↓

Euclidean differences dominated by large-range feature

↓

Similarity biased toward Assault-like dimension

↓

K-means / distance geometry distorted

↓

Scaling restores more balanced contribution

How to Read This Graph

Step 1：先看每個 feature 的 unit 與 raw range。

Step 2：找出數值 range 特別大的 feature。

Step 3：不要把「數值大」誤認為「更重要」。

Step 4：想到 distance formula 是把各 dimension 的差異合併。

Step 5：推論 large-scale variable 會主導 distance。

Step 6：得出 scaling 是必要 preprocessing 的原因。

Page 8 — The NCI60 Gene Expression Dataset ⭐⭐⭐

NCI60 有 64 cancer cell lines × 約 6,000 gene-expression measurements。這頁用一個極端但真實的 high-dimensional setting 說明：人類不能直接「看」6,000 維空間，因此需要 dimensionality reduction。

PDF Page 8 — NCI60: high-dimensionality challenge and PCA visualization

左圖：Number of Features

四根 bars 依序展示 USArrests（4）、Small（100）、Medium（1,000）、NCI60（約 6,000）。Y-axis 是 Number of Features，使用 log-like scaling 來容納跨數量級差異。重點是 feature dimensionality 由個位數迅速上升到數千。

讀 log axis 的概念  如果 axis 是 logarithmic，同樣的 vertical distance 通常代表倍率／數量級差異，而不是每次固定增加相同數量。這頁重點是「維度爆炸」，不是精確比較 bar 差幾 pixels。

右圖：PCA Scatter Plot

X-axis = First Principal Component (PC1)；Y-axis = Second Principal Component (PC2)。每個 point = 一個 cancer cell line。顏色 legend 用 cancer-type categories 幫助後續 interpretation。PCA 本身不是用這些顏色／labels 來建立 components；顏色是視覺化時加上去幫助理解結構。

~6000 gene features

↓

PCA

↓

PC1 + PC2

↓

2D positions for 64 cell lines

↓

Possible group / separation patterns become visible

常見誤解  PC1 / PC2 不是原資料中「挑出來的兩個 genes」。它們是由原始 features 組合形成的新 axes。這堂課尚未要求你推導其數學。

Page 9 — What You’ll Learn

這頁把課程能力分成 Technical Skills 與 Conceptual Understanding。真正 message 是：會跑 algorithm 不等於懂 unsupervised learning；你還必須會 method selection、interpretation、validation、communication。

Technical Skills

Conceptual Understanding

Data preparation and scaling

Choosing appropriate methods

PCA for dimensionality reduction

Interpreting unsupervised results

K-means and hierarchical clustering

Validation without ground truth

Visualization of high-dimensional data

Communicating insights clearly

Page 10 — The Unsupervised Learning Mindset ⭐⭐⭐

這張 workflow 是全課另一張核心圖：EXPLORE → VALIDATE → INTERPRET，右側再用 Iterates arrow 返回 Explore，強調 unsupervised learning 是 iterative discovery process。

PDF Page 10 — Explore → Validate → Interpret → Iterate workflow

Stage

Slide內容

真正要問的問題

EXPLORE

Visualize distributions · summary stats · identify patterns

Data 看起來有什麼候選 structure？

VALIDATE

Check stability · try multiple methods · use domain knowledge

這個 pattern 是否穩定、可重現、合理？

INTERPRET

Extract meaning · connect to context · communicate findings

這個 structure 在現實世界代表什麼？

ITERATE

Return to exploration

新 insight 是否產生新問題，需要再分析？

Key Principle  No ground truth → Multiple valid solutions → Interpretation is paramount.

Page 11 — The Exploratory Approach

P11 是 PDF-only slide，將 exploratory mindset 變成實際問題清單。四條問題幾乎直接對應後續方法：

Question

對應 concept

What natural groups exist in the data?

Clustering

What are the main axes of variation?

PCA

Which observations are most similar?

Distance / Clustering

Can patterns be visualized effectively?

Dimensionality Reduction / Visualization

Workflow：1) Exploratory data analysis → 2) Apply appropriate methods → 3) Validate findings → 4) Interpret in domain context → 5) Communicate insights。

No labels needed — just curiosity!  這句不是說 validation 不重要，而是提醒你：unsupervised learning 的出發點是 discovery question，不是已知 target 的 prediction question。

Page 12 — What We’ve Covered

Summary 六點：discover patterns without labels；PCA + clustering；real-world applications；evaluation relies on interpretation rather than accuracy；USArrests + NCI60；exploratory mindset。

Video 約 08:46–09:23 做總結。值得注意的是 summary slide 提到 USArrests / NCI60，但影片口頭部分沒有像 PDF P7/P8 一樣完整停留分析，因此如果只看 video 會漏掉 scaling 與 high-dimensional visualization 兩個重要視覺例子。

8. PDF vs Video Complementary Content

Topic

PDF

Video / Transcript

Final Understanding

Supervised vs Unsupervised

清楚左右比較

補 Accuracy、MSE、AUC

沒有 Y 改變整個 evaluation paradigm

PCA

Dimensionality / Variance / Visualization

補「new axes / principal components」直覺

PCA 找主要 variation directions

K-Means

Partitioning / Elbow / Interpretation

補 within-cluster variation

分組 + 選 K + 解釋

Customer Segmentation

Problem→Goal→Approach→Value

Amazon / behavior 例子更具體

clustering 的商業 discovery 用途

Evaluation

Internal / stability / interpretability / usefulness

用 silhouette 0.45 強調不易判斷

沒有 ground truth ≠ 無法 validation

USArrests

完整 scaling visual

影片幾乎沒展開

PDF-only 核心 scaling lesson

NCI60

完整 6000D + PCA visual

只泛稱 genomic analysis

PDF 提供真正 PCA motivation

Workflow

Explore→Validate→Interpret→Iterate

老師強調 trial-and-error

iterative discovery process

Exploratory Questions

P11 完整列出

影片略過

可直接當 project checklist

Video / Transcript Only — 必須記住

PCA 找新的 axes / principal components。

K-means 旨在讓同一 cluster 內部更 cohesive / within-cluster variation 較小。

Document workflow 可以先做 dimensionality reduction，再 clustering。

Unsupervised learning 是 trial-and-error / iterative。

Domain knowledge 是 validation 的重要部分。

PDF Only — 特別重要

USArrests 的 scaling visual。

NCI60 的 4 → 100 → 1000 → 6000 dimensionality visual。

PCA cancer-cell scatter 的 PC1 / PC2 interpretation。

Page 11 的 exploratory questions。

9. Comparison Tables

9.1 Supervised vs Unsupervised

Dimension

Supervised

Unsupervised

Data

X + Y

X only

Goal

Predict Y

Discover structure

Typical methods

Regression / Classification

PCA / Clustering

Ground truth

Available

Usually unavailable

Evaluation

Accuracy / MSE / AUC etc.

Internal criteria + stability + interpretation + usefulness

Multiple valid solutions

通常較少

常見

Role of interpretation

重要

極重要

9.2 PCA vs K-Means vs Hierarchical Clustering

Dimension

PCA

K-Means

Hierarchical

Main purpose

Reduce dimensions

Partition observations

Build hierarchy

Output

Principal components

K clusters

Dendrogram / nested groups

Core question

主要 variation？

有哪些 groups？

如何逐層組合？

Visualization

PC scatter

Cluster plot

Dendrogram

Labels required

No

No

No

10. ML Concept Map

Brain Map  Machine Learning → Supervised（Regression / Classification / known Y / prediction performance）與 Unsupervised（Foundations → PCA / Clustering → Internal Validation / Stability / Interpretability / Usefulness）。

Machine Learning

↓

Supervised Learning ↔ Unsupervised Learning

↓

Unsupervised Foundations: EDA + Scaling + Distance

↓

PCA: Dimensionality Reduction

↓

Clustering: K-Means + Hierarchical

↓

Validation: Internal + Stability + Interpretability + Usefulness

↓

Explore → Validate → Interpret → Iterate

11. 12 張 Study Cards 規劃

Card

Title

核心內容

UL1

Unsupervised Learning Big Picture

沒有 Y → discovery 而非直接 prediction

UL2

Supervised vs Unsupervised

X/Y、goal、evaluation 對比

UL3

X vs Y Symbol Card

notation + examples

UL4

Unsupervised Toolkit

Foundations → PCA → K-Means → Hierarchical

UL5

PCA Intuition

high dimension → principal components → visualization

UL6

K-Means vs Hierarchical

partition vs nested structure

UL7

Customer Segmentation

Problem → Approach → Business Value

UL8

Evaluation Without Ground Truth

internal / stability / interpretability / usefulness

UL9

USArrests + Scaling

axes / boxplot / distance distortion / scaling

UL10

NCI60 + PCA

6000D → PC1/PC2 visual

UL11

Explore → Validate → Interpret

iteration workflow

UL12

Final Concept Map

整課 exam review

12. Concept Q&A Flashcards（20 條）

1. Unsupervised learning 最核心特徵？

A：沒有已知 Y，從 X 中探索 structure。

2. Supervised vs Unsupervised 最大分別？

A：前者有 target Y；後者典型情況沒有。

3. 沒有 Y 最大問題是什麼？

A：沒有直接 ground truth 判斷結果。

4. Unsupervised 是否完全無法 evaluation？

A：不是。可用 internal criteria、stability、interpretability、usefulness。

5. PCA 主要解決什麼？

A：High dimensionality / dimensionality reduction。

6. Clustering 主要回答什麼？

A：哪些 observations 自然相似並形成 groups。

7. K-Means 的 K 是什麼？

A：預先指定／選擇的 cluster 數量。

8. Hierarchical clustering 的代表 visualization？

A：Dendrogram。

9. 為什麼 scaling 對 distance-based methods 重要？

A：否則大 numerical scale feature 會主導 distance。

10. 數值較大的 feature 是否一定更重要？

A：不是；可能只是 unit / range 不同。

11. USArrests 有多少 observations / features？

A：50 states × 4 features。

12. NCI60 的 high-dimensional challenge？

A：約 6,000 gene-expression variables。

13. PCA 為何可幫助 NCI60 visualization？

A：把大量 dimensions 表示成少數 PCs，常畫 PC1/PC2。

14. PC1 和 PC2 是原本其中兩個 genes 嗎？

A：不是；是由原 features 組合形成的新 axes。

15. Silhouette = 0.45 是否必然不好？

A：不能脫離 dataset / goal / alternatives / domain context 判斷。

16. Stability 是什麼？

A：不同 runs / reasonable perturbations 下結果是否大致一致。

17. Interpretability 是什麼？

A：所得 pattern 是否能在 domain 中合理解釋。

18. Workflow 為何需要 iteration？

A：Interpretation 會產生新問題，需要重新 explore / validate。

19. Document organization 為何可能先降維再 clustering？

A：Text features 維度高；先濃縮 representation，再分群較易探索。

20. Training accuracy = 99% 為何不是本課核心？

A：典型 unsupervised task 沒有 prediction target Y。

13. Active Recall Questions（先不要看答案）

Level 1｜用一句話分辨 supervised learning 和 unsupervised learning。

Level 2｜為什麼「沒有 Y」會令 model evaluation 困難？

Level 3｜X、Y、n、p 分別代表什麼？

Level 3｜為什麼 USArrests 的 Assault variable 可能主導 Euclidean distance？

Level 4｜一個 dataset 有 10,000 features，你想畫成 2D，首先會考慮哪類方法？為什麼？

Level 4｜K-means 每次 run 得到完全不同 clusters，這指出哪一個 validation 問題？

Level 5｜完整解釋 Different scales → Distance distortion → Clustering distortion，中間每一步 WHY。

Level 5｜為什麼 No ground truth → Multiple valid solutions → Interpretation becomes paramount？

14. 6 段完整總結

第一，這課的核心不是教授一個新 predictor，而是把 ML paradigm 從「已知答案下的 prediction」轉成「沒有答案下的 discovery」。Supervised learning 有 X 和 Y，因此可以比較 prediction 和 actual outcome；unsupervised learning 只有 X，我們要尋找 hidden patterns、similarities、groups 以及主要 variation。

第二，課程之後主要沿兩條技術路線前進。PCA 屬於 dimensionality reduction，用少數 principal components 表示 high-dimensional data；clustering 則把相似 observations 組在一起，其中包括 K-means 和 hierarchical clustering。兩類方法可以配合使用，例如先將 high-dimensional document features 降維，再進行 clustering。

第三，unsupervised learning 的一個重大問題是「沒有 ground truth」。因此不能只問 accuracy 幾高，而要看 internal criteria、stability、interpretability 和 usefulness。一個數學上看似漂亮的 cluster，如果在 business / science domain 中完全沒有意義，也未必是好結果。

第四，資料 preprocessing 特別重要。USArrests 展示 Murder、Assault、Urban Population 和 Rape 的 numerical scales 明顯不同。如果直接使用 distance-based methods，大數值 range 的 feature 會過度影響 distance，因此 scaling 是後續 PCA、K-means 等方法的重要 foundation。

第五，NCI60 展示 high dimensionality 的真正困難：只有 64 observations，卻有約 6,000 gene-expression measurements，人類根本不能直接 visualise 6,000D space。PCA 的價值就是將其中主要 variation 壓縮到少數 dimensions，使資料中的 structure 可以被人看到和理解。

第六，整個 unsupervised learning mindset 是 Explore → Validate → Interpret → Iterate。你不能只 run 一次 algorithm 就接受答案，而要探索資料、嘗試方法、檢查 stability、利用 domain knowledge 解釋結果，再因應新 insight 返回探索。這就是 supervised prediction 與 unsupervised discovery 最本質的思維差異。

15. 15 句必記精華

1. Unsupervised learning = 從沒有 labels 的 X 中發現 structure。

2. Supervised 有 X、Y；unsupervised 典型情況只有 X。

3. 沒有 Y 就沒有直接 ground truth 可以比較。

4. Unsupervised learning 可能存在多個合理 solutions。

5. PCA 的核心任務是 dimensionality reduction。

6. Principal Components 是新的 variation axes，不等於原本其中兩個 features。

7. Clustering 的目的在於把相似 observations 放在一起。

8. K-means 需要考慮 cluster 數量 K。

9. Hierarchical clustering 用 nested relationships 描述資料。

10. Features 不同 scale 可以嚴重扭曲 distance。

11. Numerically larger ≠ more important。

12. USArrests 的核心 lesson 是 scaling。

13. NCI60 的核心 lesson 是 high dimensionality → PCA visualization。

14. Unsupervised validation 要看 internal criteria、stability、interpretability、usefulness。

15. Explore → Validate → Interpret → Iterate 是整課最重要 workflow。

16. “Do I Really Understand?” Checklist

☐ 我能解釋 supervised vs unsupervised

☐ ⭐ 我知道 X 和 Y 的分別

☐ ⭐ 我知道為什麼沒有 Y 令 evaluation 困難

☐ 我知道 PCA 是做 dimensionality reduction

☐ 我知道 clustering 是尋找 groups

☐ 我知道 K-means 和 hierarchical clustering 的大方向分別

☐ ⭐ 我能解釋 scaling 為什麼影響 distance

☐ 我不會把「數字大」誤認為「feature 更重要」

☐ ⭐ 我可以完整讀懂 USArrests P7 兩張圖

☐ ⭐ 我可以解釋 NCI60 為什麼需要 PCA

☐ 我知道 silhouette 不能脫離 context 判斷

☐ ⭐ 我知道 stability、interpretability、usefulness 是什麼

☐ ⭐ 我能自己畫出 Explore → Validate → Interpret → Iterate

☐ 我能向完全不懂 ML 的人解釋 unsupervised learning

本課最值得真正吃透的 4 件事  ① X vs Y　② Scaling & Distance　③ PCA vs Clustering　④ No Ground Truth → Explore / Validate / Interpret

Source Notes

Course source: Daniel E. Acuna, University of Colorado Boulder, Introduction to Machine Learning — Unsupervised Learning, “Course Introduction & Unsupervised Learning Motivation.” 本筆記的 page / slide 結構、課程例子與核心術語依照使用者提供的 PDF、video、transcript 整理。Euclidean distance 公式明確標示為理解 scaling 的補充，而非本 slide deck 的正式推導內容。

## Connections

[[Unsupervised Learning MOC]] · [[Unsupervised Learning - Module 1 MOC]] · [[Distance Metrics and Similarity]] · [[Types of Unsupervised Methods]]

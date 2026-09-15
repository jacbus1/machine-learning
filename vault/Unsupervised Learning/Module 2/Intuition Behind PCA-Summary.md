---
course: Unsupervised Learning
module: 2
status: curated
tags:
  - unsupervised
  - module-2
  - dimensionality-reduction
  - pca
publish: true
---

# Intuition Behind PCA-Summary

> [!info] Learning position
> Unsupervised Learning → Module 2 → Topic 6

## PCA_Summary_V5_Adaptive_Mastery_Notes

PCA：Intuition Behind PCA — Summary

V5 Adaptive Mastery 完整學習筆記

由「資料點 → 中心化 → 投影 → 變異數 → PC1 / PC2」一步一步建立直覺、公式、圖像與 shape

教材原圖：PDF p.13 — PC1 是最大投影變異數方向，PC2 與 PC1 垂直。

來源分層  【教材原有】PDF + transcript；【導師補充】數學橋接、shape、完整五點實算、variable / weight 澄清、練習設計。外部網站沒有用於本筆記。

V5 使用方式  先讀 A 的 5–8 段全章總覽與 Blueprint，再按 C→F 深入。最後遮住答案做 Active Recall。讀完不等於掌握；本檔的 Mastery Ledger 會保持「未測」直到你真的作答。

目錄與來源說明

區塊

內容

A

5–8 段全章總覽 + Whole Chapter Blueprint

B

Key Concept Master List + 易混概念比較

C

數學橋接：sample / variable / value / n,p,k / vector / weight

D

Formula Master Sheet + 每條公式逐符號解釋

E

Canonical Example：五個點完整實算 PC1 / PC2

F

Mechanism Chains：每條箭頭後講 WHY

G

PDF / Video / Transcript 圖表與逐頁來源全覆蓋

H

練習階梯、Q&A、Active Recall、Answer Key

I

近期澄清項目、Error Log、Mastery Ledger、章末 15 句精華

來源規則

教材原有：PDF p.1–14 與 transcript 明確支持的內容。

導師補充：課件未直接寫出的數學橋接、矩陣 shape、精確 PCA 數值、重建公式與練習；會明確標示。

本次沒有外部網頁研究；因此不存在「外部查證」混入教材的情況。

課件 transcript 指出：本片把方向向量寫作 U；前一組影片曾叫 V；投影先前叫 Z。本文保留 U/u 的課件語言，再以 w 作同角色的補充對照。

你剛才追問的兩個重點  ① variable = feature / 欄位，不等於 value；② w1、w2 是 PC 方向的 weight / coefficient，但不能機械解讀成「重要性百分比」。兩點已整合回主筆記，不只放在附錄。

A｜Whole Chapter First：8 段全章整理

1｜問題：PCA 為甚麼存在？ PCA（Principal Component Analysis）是一種無監督式降維方法。本課關心的不是預測 target，也不是把 observation 刪掉，而是：當每筆資料有多個 variables / features 時，能否換一套新的座標軸，用較少的座標仍保留資料的主要變化？因此，2D → 1D 的意思是每筆由兩個座標改成一個主成分分數；樣本數 n 不會因降維而變少。

2｜直覺：把一把新尺旋轉到最「會說話」的方向。 把資料點畫在平面上，想像拿一把可以旋轉的尺。每選一個方向 u，就把所有點垂直投影到這條方向線上。若投影後的點分得很開，代表這個方向捕捉到較多資料變化；若擠在一起，代表很多原本差異被壓縮。PCA 的第一個目標就是找投影後變異數最大的方向。

3｜資料：sample、variable、value 要分開。 教材例子有 5 個 2D data points：P1=(1,2)、P2=(2,3)、P3=(3,3)、P4=(4,5)、P5=(5,6)。這裡 n=5 是 observations / samples；p=2 是 variables / features。Feature 1 與 Feature 2 是兩個欄位；某一格的 1、2、3… 才是 values。若只保留 PC1，k=1，資料 shape 從 5×2 變成 5×1。

4｜方法：先中心化，再投影。 真實資料未必以原點為中心，而 PCA 的方向向量表示本身沒有 intercept。課件因此先找各 feature 的平均，再把每個點減去平均，使整團資料的 mean 移到 (0,0)。之後，對任一候選單位方向 u，用 dot product 計算每筆資料的 projection score。中心化不是把資料全部變成 0，也不等同於 standardization。

5｜數學：dot product 把多維資料轉成沿新方向的一個數。 對資料點 x=(x1,x2) 與單位方向 u=(u1,u2)，投影分數 z=x·u=x1u1+x2u2。教材用 x=(3,2)、u≈(0.8,0.6) 得 z=3.6。若寫成 PC1=w1(Age)+w2(Income)，w1、w2 正是方向向量的 coefficients / weights；它們描述新軸朝哪裡，不應直接當成百分比重要性。

6｜行為：PCA 比的是「投影分散程度」。 中心化後，投影分數平均為 0，因此課件用平方平均量度某方向的 variance。PDF p.12 比較兩個方向：橙色約 4.08、藍色約 0.08。4.08 較大表示資料沿橙色方向展開得遠得多，因此 PC1 取橙色方向。這個 variance 是「投影分數的資料變異」，不是 bias–variance 章節裡模型估計器的 variance。

7｜PC2：不是第二隨便好的方向，而是「不重複 PC1 的最佳方向」。 找到 PC1 後，PC2 被限制為與 PC1 perpendicular / orthogonal，再在符合限制的方向裡最大化投影變異數。二維中 PC1 一旦確定，垂直軸基本上也確定，只剩正反方向；高維才有更多候選。u 和 −u 代表同一條主成分軸，投影分數會全部變號，但平方後的 variance 不變。

8｜結論：PCA 的本質是「換座標」，不是「刪資料」。 從 raw X(n×p) 到 centered Xc，再學到 k 個主成分方向 Vk(p×k)，最後得到 scores Z=XcVk，shape 是 n×k。若 k<p，就完成降維。最核心的三個物件一定要分清：principal component direction 是新軸；projection / PC score 是某一筆資料在新軸上的位置；variance 是整批 scores 在該軸上的分散程度。

Whole Chapter Blueprint｜主圖（資料與知識流程）

Step

物件 / Shape

做甚麼

輸出 / 意義

1

X：n×p

讀入 n 筆 observations、p 個 variables

原始 feature space

2

μ：1×p

每個 feature 各自求平均

資料中心

3

Xc：n×p

Xc = X − μ

平均移到原點；相對幾何保留

4

u：p×1，||u||=1

選一個候選方向

公平比較「方向」而非向量長度

5

z=Xc u：n×1

把所有樣本投影到 u

每筆一個 score

6

Var(z)

量度 scores 的分散程度

該方向保留多少主要變化

7

PC1

在所有單位方向中最大化 Var(z)

第一主成分方向

8

PC2

限制與 PC1 正交，再最大化 Var

第二主成分方向

9

Vk：p×k

把 k 個方向組成矩陣

新的 k 維座標系

10

Z=XcVk：n×k

一次計算所有 PC scores

降維後資料表示

主線一句話  X(n×p) → 求平均 → 中心化 Xc → 選單位方向 → 算投影 scores → 比較 variance → 最大者 PC1 → 加正交限制找 PC2 → 保留 k 個方向得到 Z(n×k)。

B｜Key Concept Master List

ID

English／中文

一句話定義

章內角色

前置

來源

優先

C01

Observation / Sample｜樣本

一筆資料，例如 P1

資料基本單位

—

PDF p.3

A

C02

Variable / Feature｜變數/特徵

資料表的一個欄位，如 Age

原始維度

C01

PDF p.3；導師澄清

A

C03

Value｜數值

某筆樣本在某 variable 上的值

填在表格的一格

C01,C02

導師橋接

A

C04

Dimension｜維度

描述每筆資料需要多少座標

決定 p / k

C02

PDF p.3；導師橋接

A

C05

Direction vector u｜方向向量

指定投影與新軸方向

PCA 候選方向

向量

PDF p.4–7

A

C06

Weight / coefficient｜權重/係數

u 或 w 的各分量，如 w1,w2

構成 PC 方向

C05

導師澄清

A

C07

Projection｜投影

把點垂直落到方向線上

多維→沿軸位置

C05

PDF p.4–7

A

C08

Projection / PC score｜投影分數

某一筆在 PC 軸上的一個數

降維後座標

C07

PDF p.6–7；TXT

A

C09

Centering｜中心化

每個 feature 減去自己的平均

把 mean 移到原點

平均

PDF p.8–10；TXT

A

C10

Variance along direction｜方向變異數

所有投影 scores 的分散程度

比較方向好壞

平方/平均

PDF p.11–12

A

C11

PC1｜第一主成分

最大投影變異數的方向

第一新軸

C07,C09,C10

PDF p.13；TXT

A

C12

Orthogonality｜正交

兩方向 dot product = 0

避免重複方向

dot product

TXT；PDF p.13

A

C13

PC2｜第二主成分

與 PC1 正交下的最大變異數方向

第二新軸

C11,C12

PDF p.13；TXT

A

C14

Sign ambiguity｜正負號不唯一

u 與 −u 是同一主成分軸

解釋不同軟體正負差

C08,C10

TXT

B

C15

Scores matrix Z｜新座標矩陣

所有樣本在 k 個 PCs 上的分數

最終降維表示

matrix mult.

導師補充

A

C16

Reconstruction｜重建

由保留 scores 近似回原空間

理解資訊損失

C08,C15

導師補充

B

易混比較 1｜Sample vs Variable vs Value

比較

Sample / Observation

Variable / Feature

Value

回答問題

哪一筆資料？

在量甚麼？

量出來是多少？

資料表位置

一整行

一整欄

一個格子

本課例子

P1

Feature 1

P1 的 Feature 1 = 1

數量符號

n

p

沒有固定總數符號

PCA 是否直接刪掉？

不因降維減少

可能由 p 個換成 k 個新 variables

重新轉換成 scores

易混比較 2｜Direction vs Score vs Variance

概念

它是甚麼物件？

誰有它？

例子

不能誤讀成

PC1 direction

向量 / 新軸

整個資料集共用

u(1)≈(0.693,0.721)

某一筆資料的值

PC1 score

scalar

每一筆樣本各有一個

P1 score≈−2.684

PC1 方向本身

Variance of PC1 scores

scalar summary

整批 samples 的 scores

≈4.08

prediction accuracy

易混比較 3｜Centering vs Standardization

比較

Centering｜中心化

Standardization｜標準化

核心運算

x − mean

通常 (x − mean) / standard deviation

本課是否直接教？

是，PDF p.8–10

否；本課沒有把它列為步驟

作用

mean 移到 0

除了中心化，也改變各 feature 尺度

是否同一件事？

不是

不是；不要把兩者混稱

C｜數學橋接：從表格到向量、矩陣、weight

C1｜Variable 到底是甚麼？

Variable（變數）在這課可直接理解為 feature / 欄位：例如 Age、Income、Debt。它回答「我們在量甚麼？」；value 則回答「某一筆量出多少？」。所以 Age 是 variable，Age=30 裡的 30 才是 value。

Person

Age（variable 1）

Income（variable 2）

A

25

40

B

35

60

C

45

90

D

30

50

E

50

100

Shape  這張表有 n=5 筆 observations、p=2 個 variables，所以數學上的資料矩陣 shape 是 5×2。PCA 若只保留 1 個 PC，輸出仍有 5 行，但只剩 1 個新座標：5×1。

C2｜w1 是 weighting 嗎？

PC1 = w1(Age) + w2(Income)

導師補充記號；課件本身使用 u=(u1,u2) 表示方向。

是，w1、w2 可以理解成 weights / coefficients：它們是 PC1 方向向量 w 的兩個 components。更精確地說，它們決定新座標軸在原本 Age 軸與 Income 軸各朝多少。

若 w=(0.6,0.8)，表示 PC 軸的方向由 0.6 個 Age 軸分量與 0.8 個 Income 軸分量構成。

若每個 feature 已用相容尺度表示，某筆資料 x=(30,50) 的 score 可寫成 0.6×30 + 0.8×50。

但 w1=0.6 不等於「Age 重要性 = 60%」。係數大小受尺度、符號方向與資料結構影響；本課的核心角色是「方向係數」。

||w|| = √(w1² + w2²) = 1

用單位向量限制，避免只靠把箭頭放大就令 score / variance 變大。

C3｜scalar、vector、matrix

物件

型態

Shape

本課例子

怎樣讀

一個 value / score

scalar

1

z=3.6

單一數字

一筆 2D data point

vector

p×1 或長度 p

x=(3,2)

一筆資料的 p 個 feature values

方向 u / w

vector

p×1

(0.8,0.6)

新軸在每個原軸的係數

整批資料 X

matrix

n×p

5×2

n 行 samples、p 列 features

k 個方向 Vk

matrix

p×k

2×1 或 2×2

每一欄是一個 PC direction

所有新 scores Z

matrix

n×k

5×1

每一行仍對應原來同一筆 sample

C4｜n、p、k 一句話

X (n×p)  →  PCA 保留 k 個方向  →  Z (n×k)

n = samples；p = 原 variables；k = 保留的 principal components。

最重要 shape 檢查  降維改的是 columns / 表示維度：p → k；不會把 n 筆資料變成 k 筆。這正是「PCA 不是把幾筆資料刪掉」的數學版本。

D｜Formula Master Sheet

ID

名稱

公式

類型

在算甚麼

來源

F01

Mean vector

μ = (1/n) Σ x_i

definition

算每個 feature 的中心

PDF p.8–9；導師明式

F02

Centering

x̃_i = x_i − μ

transformation

把 mean 移到 origin

PDF p.8–10；TXT

F03

Projection score

z_i = x̃_i · u

representation

算第 i 筆沿 u 的新座標

PDF p.6,10–11；TXT

F04

Unit-vector constraint

||u|| = 1

constraint

固定方向向量長度

導師補充

F05

Projected point

x̂_i = z_i u

geometry

把 score 轉回投影線上的點

導師補充

F06

Variance along u

Var(z) = (1/n) Σ z_i²

evaluation/objective component

量度 centered scores 分散

PDF p.11

F07

PC1 objective

u(1)=argmax_{||u||=1} (1/n)Σ(x̃_i·u)²

objective

找最大變異數方向

PDF p.12–13 + 導師形式化

F08

Orthogonality

u(2)·u(1)=0

constraint

PC2 不重複 PC1

TXT；PDF p.13

F09

PC2 objective

最大化同一 variance，subject to ||u||=1 與 u·u(1)=0

objective

在正交限制下找第二方向

TXT；導師形式化

F10

Sign ambiguity

x·(−u)=−(x·u)

identity

解釋 score 變號

TXT + 導師形式化

F11

Multi-PC transform

Z = Xc Vk

matrix transformation

一次得到 n×k scores

導師補充

F12

Approx. reconstruction

X̂ = Z Vkᵀ + μ

reconstruction

由保留 PCs 近似回原空間

導師補充

D1｜F03 Projection：dot product

z = x · u = x1u1 + x2u2

教材 p.6 的核心公式。

符號

型態 / shape

代表甚麼

本例

x

vector，長度 p

一筆資料

(3,2)

u

unit vector，長度 p

投影方向

≈(0.8,0.6)

x1,x2

scalars

該筆兩個 feature values

3, 2

u1,u2

scalars

方向在原軸的係數 / weights

0.8, 0.6

·

operator

dot product：對應相乘再加總

3×0.8 + 2×0.6

z

scalar

projection score

3.6

3×0.8 + 2×0.6 = 2.4 + 1.2 = 3.6

一句中文讀法：把資料點在每個原 feature 軸上的值，乘以新方向在對應軸上的係數，再把貢獻加起來，就得到這筆資料沿新方向的位置。

D2｜F06 Variance：為甚麼是平方平均？

Var(z) = (1/n) Σ_{i=1..n} z_i²

對 centered data，mean(z)=0，所以不必再寫 (z_i − z̄)²。

符號 / 運算

意思

為甚麼存在

n

資料筆數

最後取所有 samples 的平均

i

sample index

逐筆走訪；i 不是 samples 總數

z_i

第 i 筆投影分數

量度該筆在 u 軸上的位置

平方 z_i²

離 0 的平方距離

避免正負互相抵消；更遠的分數貢獻更大

Σ

把所有樣本貢獻加總

形成整體分散量

1/n

除以樣本數

把總平方量轉成平均平方

重要辨別  這裡的 variance 是「投影 scores 的資料變異」。不要和 supervised learning 裡「模型在不同 training samples 下預測會變多少」的 estimator variance 混在一起。

D3｜F07 PC1 目標函數

u(1) = arg max  (1/n) Σ (x̃_i · u)²   subject to ||u||=1

這是把課件「find direction of maximum variance」形式化的導師補充。

arg max 不是「最大的數值」，而是「哪一個 u 令後面的目標最大」。因此 PC1 是方向向量，不是 4.08。4.08 是選定 PC1 後，scores 的 variance。

Sanity check：如果沒有 ||u||=1，將同一支 u 放大 10 倍，所有 scores 放大 10 倍、variance 放大 100 倍，會令「最佳方向」失去意義。

D4｜F08 / F09 PC2：垂直限制

u(2) · u(1) = 0

dot product = 0 → 兩個非零向量互相 orthogonal / perpendicular。

PC2 不是「全體候選中第二大的任意方向」。它是在不能沿 PC1 重複描述資料的限制下，再尋找最大投影變異數的方向。

D5｜F10 Sign ambiguity

x·(−u) = −(x·u) = −z   ;   (−z)² = z²

u 與 −u 同一條軸；scores 反號，但 variance 相同。

E｜Canonical Example：五個點完整實算

教材原有資料

P1=(1,2)、P2=(2,3)、P3=(3,3)、P4=(4,5)、P5=(5,6)。以下平均與中心化由教材座標直接計算；精確 PC1 / PC2 方向與 scores 是導師補充，用來把 p.12 的 4.08 / 0.08 接起來。

PDF p.3：5 個 2D data points。橫軸與縱軸都是 features。

E1｜Step 1：求平均

μ1 = (1+2+3+4+5)/5 = 3   ;   μ2 = (2+3+3+5+6)/5 = 3.8

μ = (3, 3.8)

E2｜Step 2：中心化

Point

原始 x

中心化 x̃=x−μ

P1

(1,2)

(−2,−1.8)

P2

(2,3)

(−1,−0.8)

P3

(3,3)

(0,−0.8)

P4

(4,5)

(1,1.2)

P5

(5,6)

(2,2.2)

負數怎樣讀？  例如 P1 的 −2 不是「錯誤」；它代表 Feature 1 比該 feature 的平均值低 2。中心化後數值是在說「相對平均的偏離」。

E3｜Step 3：完整 PCA 方向（導師補充計算）

PC1 direction  u(1) ≈ (0.6928, 0.7211)

PC2 direction  u(2) ≈ (0.7211, −0.6928)

檢查正交：0.6928×0.7211 + 0.7211×(−0.6928) ≈ 0。兩方向都接近單位長度。

E4｜Step 4：每個點的 PC scores

Point

PC1 score

PC2 score

P1

−2.6836

−0.1951

P2

−1.2697

−0.1668

P3

−0.5769

0.5543

P4

1.5582

−0.1103

P5

2.9721

−0.0820

例如 P3 的 centered vector 是 (0,−0.8)：PC1 score = 0×0.6928 + (−0.8)×0.7211 ≈ −0.5769。這個 −0.5769 是 P3 在共同 PC1 軸上的位置，不是「P3 自己有一條 PC1」。

E5｜Step 5：4.08 與 0.08 從哪裡來？

Var(PC1 scores) ≈ 4.0816  →  4.08

Var(PC2 scores) ≈ 0.0784  →  0.08

所以本例資料幾乎沿 PC1 的斜方向展開。若只看「總投影變異」的比例，PC1 約佔 4.0816/(4.0816+0.0784) ≈ 98.1%。這個 98.1% 是導師由教材數據延伸計算，不是 PDF 直接列出的 accuracy。

不能下的結論  98.1% explained variance ≠ 98.1% prediction accuracy；也不保證任務所關心的每一種資訊都保留 98.1%。PCA 最大化的是數值上的 variance。

E6｜Step 6：真正 2D → 1D

5×2  →  保留 PC1  →  5×1

Point

原本 2D 座標

只保留 PC1 後的新座標

P1

(1,2)

−2.6836

P2

(2,3)

−1.2697

P3

(3,3)

−0.5769

P4

(4,5)

1.5582

P5

(5,6)

2.9721

Rows 不變：仍是 P1–P5；columns 由兩個原 features 變成一個 PC1 score。這就是你剛才問「PCA 不是把幾筆資料刪掉」的完整意思。

F｜Dependency / Mechanism Map：每條箭頭都講 WHY

F1｜為甚麼先中心化？

原始 mean ≠ 0  →  每點減 μ  →  mean = 0  →  方向線可穿過資料中心

WHY 1：課件 transcript 說方向向量沒有 intercept，純粹用向量乘法描述的方向從原點出發。如果資料整團遠離原點，直接用通過原點的方向線，會把「整團資料在哪裡」與「資料相對中心怎樣變化」混在一起。

WHY 2：減去同一個 mean 是整團平移，不改變點與點之間的相對幾何形狀。它把原點重新定義成資料中心，使投影分數的平均為 0，也令 p.11 的平方平均 variance 公式可以直接使用。

反例 / 限制  中心化不等於 standardization。若兩個 variables 單位尺度差很大，是否還要縮放是另一個建模決定，本課沒有把它教成固定步驟。

F2｜為甚麼 variance 大的方向被選為 PC1？

方向 u 改變  →  scores z 改變  →  score spread 改變  →  Var(z) 改變  →  選最大者

WHY 1：同一批 centered points 投影到不同方向，會產生不同的一維位置。如果某方向與資料的長軸接近，原本相隔較遠的點在投影後仍能保持較大的間距；如果方向接近資料的短軸，很多差異會被壓縮。

WHY 2：PCA 把「保留主要變化」操作化為「最大化投影分數的 variance」。所以 p.12 的 4.08 方向勝過 0.08 方向，不是因為橙色本身更好看，而是因為以同一 variance 標準比較後更大。

不能過度推論  Variance 大只代表在 PCA 的數學目標下保留較多變化；不等於該方向對所有下游任務都最有用。

F3｜為甚麼 PC2 要正交？

已找到 PC1  →  禁止沿同一方向重複  →  u(2)·u(1)=0  →  在剩餘方向找最大 variance

WHY：如果 PC2 完全沒有方向限制，而目標仍然只是最大 variance，那它會再次選 PC1，得到重複資訊。加上正交限制後，第二主成分必須從與 PC1 不同的幾何方向描述剩餘變化。

二維時，一條軸確定後，垂直軸也基本確定；高維時，與 PC1 垂直的候選方向很多，因此才需要在這個子空間內繼續最大化 variance。

F4｜為甚麼 u 與 −u 都可以？

u → −u  →  每個 score z → −z  →  z² 不變  →  variance 不變

WHY：主成分軸是一條直線，而向量箭頭只是替直線選一個正方向。把箭頭反轉，所有座標符號一起反轉；資料在線上的實際投影位置並沒有改變。

因此不同 PCA 實作可能輸出整體正負相反的 components。比較時應檢查是否只差一個符號，而不是先判定模型不同。

G｜PDF / Video / Transcript 全覆蓋與圖表深解

G1｜PDF p.3：原始 2D data

PDF p.3 — Starting Simple: A Few Data Points

X-axis：Feature 1；Y-axis：Feature 2。兩條軸都是 variables / features。

每一個 colored point 是一筆 observation；點的位置由兩個 feature values 決定。

整體大致由左下向右上延伸，為後面「長軸方向 variance 較大」提供視覺直覺。

一句讀圖  這不是 supervised 的 x-vs-y target 圖；它是在同一個 feature space 裡看 5 筆資料的幾何分布。

G2｜PDF p.5：Projection = dropping a perpendicular

PDF p.5 — 原始點沿垂直路徑投影到方向 u。

Blue point：原始 data point。Orange line / arrow：候選方向 u。Pink square：projected point。

黃色線段與方向線有直角標記：這表示 orthogonal projection，不是水平移動或垂直座標軸移動。

圖回答「投影點在哪裡」；p.6 的 dot product 進一步回答「沿 u 的一維 score 是多少」。

G3｜PDF p.9–10：Centering 後再投影

PDF p.9 — centered data：mean 現在在 origin (0,0)。

PDF p.10 — centered data 投影到候選方向 u。

p.9 的座標軸標明 centered；負值表示低於 feature mean，正值表示高於 mean。

p.10 的方向線穿過 origin，符合 transcript「vector has no intercept」的口頭補充。

G4｜PDF p.11：Variance along a direction

PDF p.11 — 列出五個 projection scores，並以平方平均衡量 spread。

教材列出：P1→−2.12、P2→−0.71、P3→−0.35、P4→0.71、P5→2.47。

score 有正有負，是因為方向軸有正反兩側；平方後不讓正負互相抵消。

這頁的角色是定義「如何為一個方向打分」；不是還未比較方向就宣布它是 PC1。

G5｜PDF p.12–13：比較方向 → PC1 / PC2

PDF p.12 — 橙色方向 var≈4.08；藍色方向 var≈0.08。

同一批 centered data，同一評估標準；改變的是候選方向。這符合機制分析中的「只改 u，比 Var(z)」。

橙色方向大致順著資料主要展開方向；投影後 scores 較分散，因此 variance 高。

藍色方向靠近短軸，scores 較集中，因此 variance 低。

PDF p.13 — 將最大變異數方向標為 PC1，垂直方向標為 PC2。

Transcript 補充  老師明確說 PC2 要被「force」為 perpendicular；在 2D 中只有方向朝上或朝下的符號選擇，兩者 variance 相同，只會令 projection signs 改變。

G6｜PDF p.14：What We’ve Covered

PDF p.14 — 課件總結：Projection、Centering、Variance、Maximum Variance Direction、Geometric Intuition。

這一頁沒有增加新公式，而是確認整課的五個核心：dot product 投影、把 mean 移到 origin、以 variance 量度 projection spread、尋找 maximum-variance direction，以及以幾何圖把前四者串起來。

G7｜PDF 14 頁覆蓋索引

頁

Topic

Concept / Figure

狀態

p.1

課程題目

Intuition Behind PCA

完成

p.2

內容地圖

projection / centering / variance / max variance / visualization

完成

p.3

toy data

5 points in 2D

完成，G1

p.4

direction + point

方向向量與資料點

完成，D1/G2 前置

p.5

orthogonal projection

drop perpendicular

完成，G2

p.6

dot product

(3,2)·(0.8,0.6)=3.6

完成，D1

p.7

all points projection

每筆得到一個 score

完成，A/C

p.8

mean point

original data + mean

完成，E1/G3

p.9

centered data

mean→origin

完成，E2/G3

p.10

centered projection

再投影

完成，G3

p.11

variance

平方平均

完成，D2/G4

p.12

two directions

4.08 vs 0.08

完成，E5/G5

p.13

PC1 / PC2

max variance + perpendicular

完成，D3–D4/G5

p.14

recap

五項總結

完成，G6

G8｜PDF vs Transcript：互補表

Topic

PDF

Transcript 補充

合併理解

方向符號

圖上主要用 u

說前一組影片曾叫 V

字母可變；角色是 principal direction vector

Projection

p.5–7 圖 + dot product

說 projection 前一課叫 Z

score 是沿方向的單一數值

Centering

p.8–10 視覺化

明說 vector has no intercept

先把資料中心移到 origin 再找方向

PC2

p.13 顯示垂直方向

明說 force perpendicular，2D 只有正反選擇

PC2 是正交限制下的下一最大 variance

Sign

PDF 圖不深入

明說 sign of vector does not matter for variance

u/−u 同軸，scores 反號、variance 不變

H｜漸退式練習 + Q&A + Active Recall

H1｜四級練習階梯

L1｜完整示範

已在 E 節完成：五個點 → mean → centering → PC directions → scores → 4.08/0.08 → 5×2 變 5×1。

L2｜補步練習

已知 x=(4,5)、μ=(3,3.8)、u=(0.6928,0.7211)。請補：① centered x̃ = (__, __)；② PC1 score = __×0.6928 + __×0.7211 ≈ __。

L3｜獨立變式

有 6 筆資料、每筆 3 個原始 features，保留 2 個 PCs。請自行寫出 X、V2、Z 的 shape，並說 Z 的每一行、每一列各代表甚麼。

L4｜情境遷移

一間銀行有 10,000 位客戶、20 個數值 features，想先把資料壓成 5 個主成分再做視覺化。回答：① n,p,k；② 輸入與輸出 shape；③ 哪個步驟不能被解讀成「刪掉 15 個客戶」？④ 如果某 PC coefficient 是 −0.7，負號本身是否代表該 feature「不好」？

H2｜20 條 Concept Q&A：先只看問題

ID

問題

關聯

Q01

PCA 的「dimension reduction」減少的是 samples 還是每筆資料的表示維度？

C01–C04

Q02

Variable 與 value 有甚麼分別？用 Age=30 解釋。

C02–C03

Q03

本課 5 個 2D 點中，n、p 分別是多少？

C01–C04

Q04

若 5×2 保留 1 個 PC，輸出 shape 是甚麼？

C15

Q05

Projection 的幾何動作是甚麼？

C07

Q06

x·u 為甚麼只得到一個數？

C08/F03

Q07

w1 在 PC1=w1Age+w2Income 中是甚麼？

C06

Q08

為甚麼 w1=0.6 不應直接讀成「Age 重要性 60%」？

C06

Q09

中心化會不會把所有點變成 0？

C09

Q10

Centering 與 standardization 是否相同？

C09

Q11

為甚麼 centered data 的 projection scores 平均為 0？

C09/C10

Q12

p.12 的 4.08 與 0.08 分別是甚麼物件的數值？

C10

Q13

PC1 是 4.08 嗎？如果不是，4.08 與 PC1 的關係是甚麼？

C11/F07

Q14

為甚麼 PC1 會沿資料長軸而不是短軸？

C10–C11

Q15

PC2 為甚麼要與 PC1 正交？

C12–C13

Q16

dot product = 0 在 PC1/PC2 中表示甚麼？

C12/F08

Q17

u 改成 −u，scores 怎樣變？variance 怎樣變？

C14/F10

Q18

PC direction 與 PC score 最大的差別是甚麼？

C08/C11

Q19

Z=XcVk 中，若 Xc 是 100×20、Vk 是 20×3，Z shape 是甚麼？

C15/F11

Q20

explained variance 98% 是否等於 prediction accuracy 98%？

C10/E5

H3｜8 條 Active Recall（無答案）

不用看筆記，畫出 X(n×p) → Xc → u → z → Var(z) → PC1 的流程，並說每個箭頭在做甚麼。

只用一句話分辨 sample、variable、value、PC score。

為甚麼「Rows 不變、Columns 變少」是 PCA 降維的好記法？

若 u=(0.6,0.8)，請解釋 0.6、0.8 是甚麼；再說為甚麼它們不是直接的重要性百分比。

如果一組 centered scores 是 −3, −1, 0, 1, 3，為甚麼平方後才適合量度 spread？

用幾何語言解釋為甚麼 PC2 需要 perpendicular to PC1。

若另一個 PCA 軟體把所有 PC1 loadings 與 scores 都乘 −1，你會怎樣判斷是否有問題？

請設計一個 4 samples × 3 features 的 toy table，說明保留 k=2 後輸出 shape 與每格的意思。

H4｜Answer Key（完成題目後再看）

ID

答案

Q01

減少每筆資料的表示維度 / variables，樣本數不因 PCA 降維而減少。

Q02

Age 是 variable / 欄位；30 是某一筆 observation 在 Age 欄的 value。

Q03

n=5，p=2。

Q04

5×1。

Q05

從資料點沿垂直於方向線的路徑落到該方向線。

Q06

dot product 把 p 個「value×direction coefficient」加總，因此輸出是一個 scalar score。

Q07

w1 是 PC1 方向在第一個原 variable 上的 coefficient / weight。

Q08

係數受方向 normalization、feature scale 與符號約定影響；它首先描述方向，不是固定百分比重要性。

Q09

不會。只有每個 feature 的平均變成 0；個別點仍有正負偏離。

Q10

不同。Centering 只減平均；standardization 通常還除以標準差。

Q11

因為每個 centered feature 的平均為 0，而 dot product 是它們的線性組合，所以 scores 的平均也為 0。

Q12

是兩個候選方向上 projection scores 的 variance。

Q13

不是。PC1 是令 variance 最大的方向；4.08 是沿該方向所得 scores 的 variance。

Q14

沿長軸投影後點保留較大的分離，scores spread 較大，所以 variance 大。

Q15

避免第二主成分重複第一主成分已捕捉的同一方向。

Q16

兩個方向向量 orthogonal / perpendicular。

Q17

每個 score 乘 −1；平方與 variance 不變。

Q18

direction 是全體資料共用的一條向量 / 新軸；score 是每一筆資料在該軸上的一個 scalar 位置。

Q19

100×3。

Q20

不是。Explained variance 是 PCA 對資料變化的保留比例，不是 supervised prediction accuracy。

L2 / L3 / L4 參考答案

L2：x̃=(1,1.2)；score≈1×0.6928+1.2×0.7211≈1.558。

L3：X=6×3；V2=3×2；Z=6×2。Z 每行對應一筆 sample，每列對應一個 PC score。

L4：n=10,000、p=20、k=5；輸出 10,000×5。被減少的是表示 columns，不是客戶 rows。負 coefficient 只是方向與座標正向的相對關係，不能單憑負號判「不好」。

I｜近期澄清、Error Log、Mastery Ledger

I1｜本次對話已出現的澄清點（不是錯誤判定）

項目

你提出的問題

V5 類型

目前狀態

應再測甚麼

PCA 降維對象

「不是把幾筆資料刪掉」是甚麼意思？

H / C

已解釋；未測

給新 shape，自己指出 row / column 哪個改

Variable

「即甚麼是 variable？」

C / S

已解釋；未測

用新表格分辨 sample / variable / value

Weight

「w1 是 weighting？」

S / C

已解釋；未測

解釋 coefficient、unit vector、為何不等於百分比重要性

V5 原則  提出追問只證明這些位置值得澄清，不足以證明你已不懂或已掌握。所以下面的 Mastery Ledger 不會自行標「通過」。

I2｜Error Log

日期/單元

題目

原答案/行為

錯誤代碼

第一個錯位

修正

再測

下次

2026-09-09 / PCA

Rows vs columns

澄清問題，非作答

H/C

未判定

已加入 shape 說明

未測

新 shape 題

2026-09-09 / PCA

variable

澄清問題，非作答

C/S

未判定

variable vs value 表

未測

新表格辨別

2026-09-09 / PCA

w1 / weighting

澄清問題，非作答

S/C

未判定

weight/coefficient + 非百分比

未測

新 score 題

I3｜Mastery Ledger

Concept

能否解釋

手算

讀圖

Shape

選法/限制

延遲再測

狀態

Sample / variable / value

未測

N/A

未測

未測

N/A

未測

需檢查

Projection / dot product

未測

未測

未測

未測

N/A

未測

需檢查

Centering

未測

未測

未測

未測

未測

未測

需檢查

Variance along direction

未測

未測

未測

N/A

未測

未測

需檢查

PC1 / PC2

未測

未測

未測

未測

未測

未測

需檢查

Weight / coefficient

未測

未測

N/A

未測

未測

未測

需檢查

Sign ambiguity

未測

未測

未測

N/A

未測

未測

需檢查

I4｜延遲複習起始節奏

相對時間

做甚麼

成功證據

當次結尾

遮住筆記，用自己的話講「PCA 不刪 samples」+ 手算一個 dot product

不看答案完成

約 1 天

n/p/k + variable/value + centering WHY

符號與 shape 無提示

約 3 天

改數字做 2D→1D score；讀一張 projection 圖

不是只記原例

約 7 天

混合分辨 direction / score / variance / weight

能自己選對概念

約 14 天

小型 PCA shape + 圖 + 文字 teach-back

跨表示與情境仍可用

章末 15 句精華

1. PCA 是無監督式降維：減少的是每筆資料的表示維度，不是刪除 observations。

2. Sample 是一行；variable / feature 是一欄；value 是一格。

3. n 是樣本數、p 是原始 variables 數、k 是保留 PCs 數。

4. 5×2 → 5×1 的 5 沒變，代表五筆資料仍全部存在。

5. Projection 是把點垂直落到某個方向 u 上。

6. Dot product z=x·u 把多個 feature values 合成沿 u 的一個 score。

7. w1、w2 是 PC 方向的 weights / coefficients，不等於直接的百分比重要性。

8. PCA 通常先 center：每個 feature 減去自己的 mean。

9. Centering 把資料 mean 移到 origin，但不等於 standardization。

10. 對 centered data，某方向的 projection variance 可以用 scores 的平方平均量度。

11. PC1 是令 projection variance 最大的方向，不是 variance 數值本身。

12. 本課例子中 PC1 variance≈4.08，PC2≈0.08，資料主要沿 PC1 展開。

13. PC2 要與 PC1 orthogonal，避免重複同一個方向。

14. u 與 −u 是同一條 principal axis；scores 反號但 variance 不變。

15. PCA 最終可以寫成 Xc(n×p) × Vk(p×k) = Z(n×k)：本質就是換一組更會說話的座標軸。

下一步建議  不要再重讀整份一次。先遮住 H2 的答案，完成 Q01–Q08；如果能無提示回答，再做 L3 shape 題。這才會提供 V5 Mastery Ledger 可更新的證據。

Source Note

教材：University of Colorado Boulder, “Intuition Behind PCA”, Introduction to Machine Learning – Unsupervised Learning, Daniel E. Acuna。本文依提供的 PDF p.1–14 與 transcript 整理。數學形式化、完整五點 PCA 數值、矩陣 shape、重建、variable / weight 的額外澄清均標為「導師補充」，不冒充教材原文。

## Connections

[[Unsupervised Learning MOC]] · [[Unsupervised Learning - Module 2 MOC]] · [[Intuition Behind PCA-Projecting Datapoints into Principal Components]] · [[Intuition Behind PCA-Truncated SVD]]

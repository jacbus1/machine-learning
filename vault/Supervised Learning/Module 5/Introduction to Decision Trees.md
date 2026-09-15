---
course: Supervised Learning
module: 5
status: curated
tags:
  - supervised
  - module-5
  - decision-trees
publish: true
---

# Introduction to Decision Trees

> [!info] Learning position
> Supervised Learning → Module 5 → Topic 5

## Introduction_to_Decision_Trees_完整學習筆記

Introduction to Decision Trees

決策樹完整學習筆記｜Regression • Classification • XOR • Threshold • Interaction

Tree-Based Methods & Ensembles

依據課程 PDF、Video Transcript、課堂截圖及本次對話整理

一句話核心

Decision Tree 不用一條 global line 解釋整個資料，而是透過「feature + threshold」反覆切割 predictor space，讓不同 region 使用不同 prediction。

學習重點：先建立直覺，再進入公式；所有重要 symbols、例子、常見誤解、Bias–Variance 連結均整理在內。

內容導航

Part

主題

1

Big Picture & Learning Flow

2

核心 Concepts：Tree / Threshold / Region / Leaf

3

Regression Tree + RSS

4

Classification Tree + XOR

5

Interaction

6

Overfitting / Instability / Bias–Variance

7

PDF + Video 逐頁整合

8

模型比較與 Concept Map

9

Study Cards / Q&A / Active Recall

10

5 段總結 + 15 句必記 + Checklist

1. Big Picture：這一課到底在學什麼？

這一課的核心問題是：當資料存在明顯的非線性、門檻效應（threshold effect）或 feature 之間的 interaction 時，如何建立一個仍然容易解釋的模型？Linear Regression / Logistic Regression 的基本版本主要依賴一個 global linear relationship；Decision Tree 則改用一連串 if/else 規則，把資料空間切成多個區域。

Decision Tree 的核心不是「畫一棵樹」，而是「partition predictor space」。樹只是把切割規則可視化的表示法。對 regression，每個 leaf 輸出數值；對 classification，每個 leaf 輸出類別或類別機率。

核心思維

Linear Model：一個 global rule。  Decision Tree：不同 region 可以有不同 local rule。

Learning Flow

Problem → Split by Feature + Threshold → Regions → Leaf Prediction → Repeat Splitting → Control Complexity → Generalization

先切空間，再在每個區域做預測；tree 太深則可能 overfit。

2. Concept-by-Concept Detailed Explanation

2.1 Decision Tree（決策樹）

一句話定義：Decision Tree 是一種以條件規則反覆切割 feature space，最後在 leaf 輸出 prediction 的樹狀模型。

Root node：最頂端的第一個判斷。

Internal node：中間的判斷點，例如 x ≤ 6.602？

Branch：True / False 後走的路徑。

Leaf / terminal node：不再切割，直接輸出 prediction。

Depth：從 root 到最深 leaf 的層數，代表模型複雜度的重要指標。

2.2 Threshold（門檻值 / 切割點）

x_j ≤ c ?

x_j 是第 j 個 feature；c 是 threshold。

Threshold 回答的是：「在哪一個數值位置切資料？」例如 Income ≤ 50,000，把資料分成低於／等於 50,000 與高於 50,000 兩組。Decision Tree 會比較許多候選 threshold，選擇能令誤差下降最多的切法。

直覺例子

如果真實關係是 Income < 50k → spending≈1；Income ≥ 50k → spending≈4，這是「突然跳變」而不是平滑上升。Tree 可以直接用 50k 當 threshold。

2.3 Region（區域）與 Piecewise Constant（分段常數）

每次 split 都把 predictor space 分成更小的 regions。Regression Tree 在同一個 region 中給所有 observations 同一個 prediction，因此整體 prediction function 通常呈階梯狀（step function）。

ŷ(x) = ŷ_Rj  for x ∈ R_j

只要新資料 x 落入 region R_j，就輸出該 region 的固定預測值 ŷ_Rj。

PDF Page 4：Linear Regression 與 Decision Tree（depth=2）對同一非線性資料的比較。

圖意：左邊 Linear Regression 用一條接近水平的 global line，無法捕捉「低 → 高 → 低」的突變；右邊 Decision Tree 使用多段水平 prediction，因此能配合不同 x 區域。

PDF Page 5：左邊 step function 與右邊 tree representation 是同一個模型的兩種表示。

3. Regression Tree：如何工作？

3.1 直覺流程

Data → Try candidate splits → Compare error → Choose best split → Repeat → Leaf mean prediction

每次只做目前最有利的切割，實務上屬於 greedy strategy。

在 regression 中，target y 是連續數值，例如房價、收入、銷售額。Tree 會把 predictor space 分成 J 個不重疊 regions R₁,…,Rⱼ，每一個 region 預測該區域 training y 的平均值。

3.2 課堂例子：低 → 高 → 低

Region

x 範圍（簡化）

區域內 y 大概

Leaf prediction

R₁

x ≤ 3.34

約 1

ŷ≈1.0

R₂

3.34 < x ≤ 6.60

約 4

ŷ≈3.9

R₃

x > 6.60

約 1

ŷ≈0.9

ŷ(x) = { 1.0, x≤3.34 ; 3.9, 3.34<x≤6.60 ; 0.9, x>6.60 }

因此預測線是 step function，而不是平滑曲線。

3.3 Leaf 中的 squared_error / samples / value

Tree 顯示

意思

如何解讀

x ≤ 3.343

split rule / threshold

判斷 observation 走左或右 branch

squared_error = 0.321

node 內 y 的分散程度

越小代表該 node 內 y 越集中

samples = 69

training samples 數量

有 69 個 training observations 落在此 node

value = 0.969

平均 response

若這是 leaf，新 observation 會預測約 0.969

3.4 Regression Tree Formal Objective

PDF Page 8：Tree-Based Regression 的 formal objective。

arg min_(R₁,…,Rⱼ)  Σ_(j=1)^J  Σ_(i∈Rⱼ) (yᵢ − ŷ_Rj)²

找一組 regions，使全部 training squared residuals 的總和最小。

Symbol Dictionary

Symbol

English

中文

意思 / 作用

Rⱼ

Region j

第 j 個區域

由 split 切出的 predictor-space 區域

J

Number of regions

區域總數

總共有多少個 terminal regions

x

Predictor vector / input

輸入特徵

新 observation 的 features

yᵢ

Observed response

第 i 個真實值

training data 中 observation i 的 target

ŷ_Rj

Region prediction

區域預測值

Rⱼ 內 training y 的平均值

i

Observation index

樣本索引

表示第 i 個 observation

j

Region index

區域索引

表示第 j 個 region

Σ

Summation

加總

把多個 error 加起來

(yᵢ−ŷ_Rj)²

Squared residual

平方殘差

實際值與區域預測的差距平方

arg min

Argument minimizing

使目標最小的選擇

不是最小值本身，而是令 RSS 最小的 regions/splits

3.5 為什麼每個 region 用平均 y？

ŷ_Rj = (1 / |R_j|) Σ_(i∈R_j) yᵢ

在 squared-error loss 下，固定常數 prediction 的最佳值就是平均數。

如果某 region 的 y = [0.8, 1.0, 1.2, 1.0]，平均為 1.0。使用 1.0 當 prediction 時，該區域 RSS = (0.8−1)²+(1−1)²+(1.2−1)²+(1−1)² = 0.08。

RSS 的角色

Tree 會嘗試在不同 feature / threshold 上切割，選擇令子節點合計 RSS 降低最多的 split。

3.6 為什麼 exact optimization 很難？

如果同時枚舉所有 feature、threshold、split sequence、depth 與 tree structure，可能組合數會非常龐大。課程指出「一次找到全局最佳 partition」在計算上不可行，因此後續演算法使用 heuristic / greedy splitting：每一步先選目前最好的 split，而不是搜尋所有完整 trees。

4. Classification Tree 與 XOR

4.1 Classification Tree 是什麼？

Classification Tree 的 target y 是類別，例如 Fraud / Not Fraud、Pass / Fail、Red / Blue。它與 Regression Tree 的切割概念相同，但 leaf 輸出的是 class（或 class probability），而不是連續數值。

項目

Regression Tree

Classification Tree

Target y

連續數字

類別

Leaf output

mean y / numeric value

class / class probability

例子

house price

fraud / normal

常見 split criterion

RSS / MSE reduction

Gini / entropy / classification purity（本課未深入）

共同核心

partition feature space

partition feature space

4.2 XOR（Exclusive OR，互斥或）

PDF Page 6：XOR-shaped classification data；同類位於對角位置。

x₁

x₂

XOR y

0

0

0

0

1

1

1

0

1

1

1

0

XOR 的規則：兩個 input 不同 → y=1；兩個 input 相同 → y=0。幾何上，同一類分布在對角位置，因此不能由一條直線完美分開。

4.3 Logistic Regression vs Decision Tree

PDF Page 7：Linear Logistic boundary 對 XOR 表現差；Tree 用多次 orthogonal splits 表現好。

普通 Logistic Regression 的 decision boundary 是 linear。XOR 不是 linearly separable，所以課堂例子 Logistic accuracy 約 0.51（接近 random）。Decision Tree 可以用水平 / 垂直（orthogonal）splits 把平面切成矩形 decision regions，因此 depth 約 4 的 tree 可達約 0.97 accuracy。

x₁ ≤ 0 ?  → then x₂ ≤ 0 ?

先按 x₁ 分左右，再按 x₂ 分上下，就能形成四個矩形區域，分開 XOR。

5. Interaction（交互作用）到底是什麼？

一句話定義

Interaction = 一個 feature 對 target 的影響，取決於另一個 feature 的值。

例如 AML：Transaction Amount 對 fraud risk 的影響，可能取決於 Country Risk。如果是 low-risk country，$10,000 可能正常；如果是 high-risk country，同樣 $10,000 可能更可疑。這表示 Amount 的效果不是固定，而是 depends on Country。

Linear additive model: y = β₀ + β₁x₁ + β₂x₂

沒有 interaction 時，x₁ 的 marginal effect 不隨 x₂ 改變。

With interaction: y = β₀ + β₁x₁ + β₂x₂ + β₃x₁x₂

β₃x₁x₂ 是 interaction term；普通線性模型通常需要手動加入。

Decision Tree 可以自然表示 interaction：先按 Country 分 branch，再在不同 branch 使用不同 Amount threshold。也就是「先看 x₁，再在不同 x₁ 狀態下看 x₂」，所以不需要顯式建立 x₁x₂ term 也能捕捉交互作用。

概念

Threshold

Interaction

核心問題

在哪裡切？

A 的效果是否取決於 B？

典型形式

x_j ≤ c

不同 branch 使用不同 feature / threshold

例子

Amount > $10k

Amount 的風險影響取決於 Country Risk

Tree 角色

決定 split point

由 sequential splits 自動形成

6. Advantages, Drawbacks, Overfitting & Bias–Variance

PDF Page 9：Tree depth=10 出現很多狹窄而奇怪的小區域，展示 overfitting。

6.1 優點

可處理 numeric / categorical features（概念層面）。

能捕捉 nonlinearity、threshold effects 和 interactions。

規則與 tree 結構容易 visualize / explain。

Regression 與 classification 都能使用。

6.2 缺點

Tree 太深會 overfit：模型開始切出很多只為少量 observations 服務的小 regions。

對 training data 的小變化可能非常敏感：早期 split 一改，後續整棵 tree 都可能變。

單棵 tree 因此常屬 high-variance learner。

6.3 Cause-and-Effect：Tree depth

Tree Depth ↑ → Regions ↑ → Model Flexibility ↑ → Training Error ↓ → Variance ↑ → Overfitting Risk ↑ → Test Error may ↑

深度增加不是「一定變差」，但過深會增加 fit noise 的風險。

Tree too shallow → High Bias / Low Variance → Underfitting

規則太少，無法捕捉真正 pattern。

Tree too deep → Low Bias / High Variance → Overfitting

對 training data 太敏感，generalization 可能變差。

這亦是 pruning、bagging、Random Forest、ensemble methods 的動機：控制單棵樹的複雜度，或聚合很多 trees 以降低 variance / instability。

7. PDF + Video / Transcript 逐頁整合

Page 1 — Introduction to Decision Trees

PDF 本頁內容

Video / Transcript 補充

最終理解

課程標題，定位在 Tree-Based Methods & Ensembles。

Video 開場說明會從「trees 是什麼、如何從零理解、與之前方法比較」開始，並涵蓋 regression / classification / splits / pros & cons / overfitting。

這頁建立課程定位：Decision Tree 是後續 ensemble methods 的基礎。

Page 2 — What We’ll Cover

PDF 本頁內容

Video / Transcript 補充

最終理解

四個主軸：tree intuition；regression vs classification；如何 split；pros/cons 與 overfitting。

Transcript 特別強調會理解 how to build trees from scratch，以及 splits 理論。

把整課視為「直覺 → 例子 → 表示 → classification → formal objective → limitations」。

Page 3 — Why Trees?

PDF 本頁內容

Video / Transcript 補充

最終理解

Linear models 是 global trend；較難處理 thresholds / interactions；trees 可以自動發現這些結構。

Video 補充：linear model 不是不能擴展，可以用 polynomial features，但 tree 在原始 feature space 中仍可保持很直觀、可解釋。

重點不是「linear model 永遠不行」，而是 basic global linear form 對 abrupt regional structure 不自然。

Page 4 — Example

PDF 本頁內容

Video / Transcript 補充

最終理解

同一資料：Linear Regression 幾乎水平；Tree depth=2 呈低→高→低 step。

Video 說明資料約 x=0–3 時 y≈1、3–7 時 y≈4、7–10 又≈1；tree 透過 sharp changes 更貼合。

這頁是 regression tree 最重要的視覺直覺：不同區域有不同 prediction。

Page 5 — Tree Representation

PDF 本頁內容

Video / Transcript 補充

最終理解

左圖 step function；右圖 tree：x≤6.602、x≤3.343、x≤6.753 等節點。

Video 逐步口述新 observation 如何由 root 沿 True/False 走到 leaf。

圖與樹是同一模型：每個 leaf 對應左圖的一段 constant region。

Page 6 — Trees also classify

PDF 本頁內容

Video / Transcript 補充

最終理解

展示 XOR-shaped red/blue clusters。

Video 解釋 blue/red 可視作 0/1，這是一個經典 exclusive-or problem。

Transition：同一個 partition-space 思想不只做 regression，也可做 classification。

Page 7 — Logistic vs Tree

PDF 本頁內容

Video / Transcript 補充

最終理解

單一 linear boundary 無法捕捉 XOR；tree 用 orthogonal splits。

Video 強調 logistic accuracy 約 51% 接近 random，而 depth=4 tree 約 97%。

本頁展示「非線性 decision regions」是 tree 的強項。

Page 8 — Formal Objective

PDF 本頁內容

Video / Transcript 補充

最終理解

將 predictor space 分成 J 個不重疊 rectangles；每 region 預測 constant；最小化 RSS。

Video 進一步說明 exact partition optimization computationally intractable，因此後續需要 heuristic。

把前面的 step-function intuition 正式化成 RSS optimization。

Page 9 — Advantages & Drawbacks

PDF 本頁內容

Video / Transcript 補充

最終理解

優點：numeric/categorical、nonlinear/interactions、容易解釋。缺點：過深 overfit、small-data instability。

Video 補充：如果 tree 足夠高，甚至可以讓每一個 data point 落到自己的 region，training prediction 幾乎完美，但其實 fit noise。

直接連到 Bias–Variance 與後續 pruning / ensemble。

Page 10 — What We Covered

PDF 本頁內容

Video / Transcript 補充

最終理解

總結 regression/classification intuition、splits、pros/cons、pruning/ensembles motivation。

Video 結尾預告下一課會看 pruning，因為 trees 有時 overfit 太多。

本課是「tree fundamentals」，下一步就是 tree-building algorithm、pruning、ensemble。

7.1 PDF vs Video Complementary Content

Topic

PDF

Video / Transcript

合併理解

Linear model limitation

global trend / thresholds / interactions

補充 polynomial regression 也是可能擴展方式

Tree 的優勢是以簡單 region rules 直接表達 abrupt/nonlinear structure

Regression example

圖示 linear vs tree

口頭指出三段 y 水平與 sharp changes

step function = region-specific constants

Tree representation

節點與 leaf 圖

逐步解釋 True/False traversal

tree rules 對應 feature-space regions

Formal objective

RSS optimization formula

強調 exact solution intractable

實務需 greedy / heuristic split strategy

Overfitting

depth=10 圖

說明極端情況可一點一 region

training error 很低不代表 generalization 好

8. Comparison Tables & ML Concept Map

8.1 Linear / Polynomial / Decision Tree

Model

Prediction shape

主要假設 / 結構

適合 pattern

可解釋性

Linear Regression

直線 / hyperplane

一個 global linear trend

近線性關係

高

Polynomial Regression

smooth curve

人工加入 polynomial basis

平滑 nonlinear pattern

中

Decision Tree

step / rectangular regions

if/else axis-aligned splits

threshold、interaction、regional pattern

高（tree 不太深時）

8.2 Regression Tree vs Classification Tree

項目

Regression

Classification

Target

continuous

categorical

Leaf output

mean y

class / probability

Loss / criterion in本課

RSS / squared error

本課未正式推導分類 criterion

圖形

step function

decision regions

共同點

feature + threshold splitting

feature + threshold splitting

8.3 Concept Map

Least Squares / RSS → Regression Tree split objective → Model Complexity → Bias–Variance → Overfitting → Pruning / Ensemble → Random Forest

把本課連到你之前學過的 RSS、Bias–Variance、Generalization。

Classification → Linear boundary limitation → XOR → Tree regions → Nonlinearity / Interaction

把本課連到 Logistic Regression 與 classification decision boundaries。

9. Study Cards（12 張卡片藍圖）

DT-01 Big Picture

Decision Tree = feature + threshold + repeated splits + regions + leaf predictions。

DT-02 Why Trees?

Linear global rule 對 threshold / interaction / nonlinear regions 不自然；tree 直接分區。

DT-03 Regression Example

低→高→低資料；Linear 幾乎水平，Tree 用 step function。

DT-04 Tree Representation

Step function ↔ tree branches；每個 leaf 對應一個 region。

DT-05 Node Anatomy

threshold / squared_error / samples / value 的意思。

DT-06 Classification

Leaf 輸出 class；使用 regions 做 decision boundary。

DT-07 XOR

對角同類、非線性可分；Logistic linear boundary 差，Tree 多次切割好。

DT-08 Interaction

一個 feature 的效果取決於另一 feature；tree 由 sequential splits 自動捕捉。

DT-09 Formal Objective

minimize total RSS across regions；leaf prediction = region mean。

DT-10 Symbol Dictionary

R_j、J、y_i、ŷ_Rj、Σ、arg min 等全部符號。

DT-11 Advantages

nonlinearity、interaction、interpretability、regression/classification。

DT-12 Drawbacks

depth↑ → complexity↑ → variance↑ → overfit risk↑；small-data instability。

先前整理的 12-card overview，可作快速複習；本 DOCX 已把每張卡片內容展開成完整文字筆記。

10. Concept Q&A Flashcards（20 題）

Q1：Decision Tree 的核心不是「樹」本身，而是什麼？

A：Partition feature/predictor space；樹只是把 split rules 表示出來。

Q2：Threshold 是什麼？

A：某 feature 的切割門檻 c，例如 x≤3.34，用來決定資料走哪個 branch。

Q3：Regression Tree 的 leaf 通常預測什麼？

A：落入該 leaf/region 的 training y 平均值。

Q4：為什麼 regression tree prediction 是 step function？

A：因為同一 region 內所有 x 都得到同一個 constant prediction。

Q5：samples=69 是什麼？

A：有 69 個 training observations 到達該 node。

Q6：value=0.969 是什麼？

A：regression node 中 training y 的平均；若為 leaf，亦是 prediction。

Q7：RSS 在 tree 裡有什麼作用？

A：衡量 region prediction 的 squared residual 總和；tree 想選令 RSS 降低最多的 splits。

Q8：arg min 與 min 有何分別？

A：min 是最小的目標值；arg min 是「哪個 split/regions」令目標最小。

Q9：XOR 是什麼？

A：Exclusive OR；兩 inputs 不同則 1，相同則 0；幾何上同類在對角。

Q10：為什麼普通 Logistic Regression 對 XOR 很差？

A：其基本 decision boundary 是一條直線，而 XOR 不是 linearly separable。

Q11：Decision Tree 如何處理 XOR？

A：用多次 horizontal/vertical splits 建立矩形 regions。

Q12：Interaction 的一句話定義？

A：一個 feature 的效果取決於另一個 feature 的值。

Q13：Tree 為什麼能自動捕捉 interaction？

A：不同 branch 可以根據先前 feature 狀態，再對另一 feature 使用不同 split。

Q14：Tree depth 增加通常對 training error 有何影響？

A：下降或不增加，因模型更 flexible；但 test error 不保證下降。

Q15：為什麼 deep tree 容易 overfit？

A：可以建立很多細小 regions，開始配合 noise 或個別 observations。

Q16：Deep tree 的 bias / variance 通常怎樣？

A：較低 bias、較高 variance。

Q17：Shallow tree 的風險？

A：規則太少，可能 high bias / underfit。

Q18：Tree instability 是什麼？

A：training data 只小幅改變，早期 split 可能改變並引發整棵 tree 大幅變化。

Q19：為什麼後面會學 Random Forest？

A：聚合很多 trees 可降低單棵 tree 的 variance / instability。

Q20：Training error 很低是否代表 tree 一定好？

A：不一定；可能只是 overfit。真正要看 validation/test generalization。

11. Active Recall（先不要看答案）

Level 1：用一句話定義 threshold。

Level 1：Regression Tree 與 Classification Tree 的 leaf output 有什麼不同？

Level 2：為什麼 Decision Tree 特別適合有 abrupt threshold pattern 的資料？

Level 2：為什麼 XOR 無法被單一 linear decision boundary 完美分開？

Level 3：在公式 Σ_j Σ_i∈Rj (y_i−ŷ_Rj)² 中，ŷ_Rj 是什麼？為什麼通常用平均？

Level 3：arg min 在 formal objective 中代表什麼？

Level 4：如果 tree depth 從 2 增加到 15，training error 與 variance 通常如何變？為什麼？

Level 5：請完整解釋：Depth ↑ → Complexity ↑ → Training Error ↓ → Variance ↑ → Overfitting Risk ↑ → Generalization 可能下降。

12. 5 段完整總結

第一段｜Decision Tree 的核心思想：Decision Tree 不像基本 Linear Regression 用一條 global line 解釋所有資料，而是透過一連串「feature ≤ threshold？」的規則，把 predictor space 切成不同 regions。每個 observation 從 root 根據 True / False 走到 leaf；這令 tree 能自然處理 abrupt thresholds、nonlinearity 與不同區域具有不同規律的資料。

第二段｜Regression Tree：Regression Tree 的 target 是連續數字。模型把 predictor space 分成 R₁,…,Rⱼ，並在每個 region 預測一個固定數值，通常是該 region training y 的平均，因此 prediction function 是 step function。模型的 formal objective 是選擇 regions 使所有 observations 的 squared residuals 加總（RSS）盡量小。

第三段｜Classification Tree 與 XOR：Classification Tree 以同樣的 partition 思想預測類別。XOR 是經典例子：同一類位於對角位置，普通 Logistic Regression 的單一 linear boundary 無法很好分離，課堂示例 accuracy 約 0.51；Decision Tree 可以透過多次水平／垂直 splits 建立矩形 decision regions，因此能高效表示 XOR pattern。

第四段｜Threshold 與 Interaction：Threshold 是 split 的門檻位置，例如 x≤3.34；Interaction 則是「一個 feature 的 effect 取決於另一個 feature」。Tree 透過 sequential branching 能自然捕捉 interaction，例如先按 Country Risk 分支，再在不同 branch 使用不同 Transaction Amount threshold。這是 trees 相對基本 additive linear models 的重要優勢。

第五段｜Complexity 與 Generalization：Tree 越深，regions 越多、flexibility 越高，training error 通常下降，但 variance 與 overfitting risk 也上升。過深 tree 可能為 noise 建立細碎 regions，而且對少量 data changes 很不穩定。因此下一步會引出 pruning、bagging、Random Forest 與 ensemble methods，用來控制 complexity 或降低單棵 tree 的 variance。

13. 15 句必記精華

1. Decision Tree 的本質是 partition predictor space，而不是單純「畫一棵樹」。

2. 每個 split 通常由「feature + threshold」組成，例如 x_j ≤ c。

3. Threshold 回答「在哪裡切」，Interaction 回答「A 的效果是否取決於 B」。

4. Regression Tree 的每個 leaf 通常輸出該 region training y 的平均值。

5. Regression Tree 因此形成 piecewise constant / step-function predictions。

6. RSS 是所有 squared residuals 的總和，regression splits 會嘗試讓它下降。

7. arg min 代表「令目標函數最小的選擇」，不是最小值本身。

8. XOR = Exclusive OR；兩 input 不同輸出 1，相同輸出 0。

9. XOR 的同類位於對角，因此不是 linearly separable。

10. 普通 Logistic Regression 的單一 linear boundary 對 XOR 很弱。

11. Decision Tree 可用 orthogonal splits 建立 rectangular decision regions。

12. Tree 透過不同 branches 自然捕捉 feature interactions。

13. Tree depth 增加會提升 model complexity 和 flexibility，training error 通常下降。

14. 過深 tree 通常 low bias / high variance，容易 overfit 和 fit noise。

15. 單棵 tree 的 instability 是後續 pruning、bagging、Random Forest 與 ensembles 的重要動機。

14.「我真的懂了嗎？」Checklist

☐ ⭐ 我能不用公式解釋 Decision Tree 為什麼要切 predictor space。

☐ ⭐ 我知道 threshold 是什麼，並能自己舉一個 threshold effect 例子。

☐ 我知道 root / node / branch / leaf / depth 的意思。

☐ ⭐ 我知道 Regression Tree 為什麼在 leaf 使用 mean y。

☐ ⭐ 我能逐個解釋 RSS 公式內 R_j、J、y_i、ŷ_Rj、Σ、arg min。

☐ 我可以手算一個 region 的 RSS。

☐ ⭐ 我能解釋 XOR 為什麼不是 linearly separable。

☐ 我知道 Classification Tree 如何用 rectangular regions 分 XOR。

☐ ⭐ 我能用自己的例子解釋 interaction。

☐ 我知道 Decision Tree 如何透過 sequential splits 捕捉 interaction。

☐ ⭐ 我能解釋 Depth ↑ 為什麼會導致 Variance ↑。

☐ 我知道 shallow tree 可能 underfit、deep tree 可能 overfit。

☐ 我知道 training error 很低不等於 generalization 一定好。

☐ 我能比較 Linear Regression / Logistic Regression 與 Decision Tree 的核心差異。

☐ 我知道為什麼本課自然接到 pruning / Random Forest / ensembles。

## Connections

[[Supervised Learning MOC]] · [[Supervised Learning - Module 5 MOC]] · [[Interpreting Ensemble Models]] · [[Pruning]]

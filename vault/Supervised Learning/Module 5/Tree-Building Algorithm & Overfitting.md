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

# Tree-Building Algorithm & Overfitting

> [!info] Learning position
> Supervised Learning → Module 5 → Topic 7

## Tree_Building_Algorithm_Overfitting_完整總結筆記

TREE-BUILDING ALGORITHM& OVERFITTING

Decision Trees｜完整總結學習筆記

Regression Tree • Classification Tree • Greedy Splitting • RSS • Gini • Entropy • XOR • Overfitting • Pruning

核心一句：Decision Tree 會反覆尋找「哪個 feature 的哪個 threshold，能讓目前節點的預測誤差 / 不純度下降最多？」；若切得太深，就容易把 noise 當成規律而 overfit。

本筆記你應該學會

理解 Decision Tree 如何由 root node 一步一步長成。

知道 Regression Tree 為什麼用 RSS，Classification Tree 為什麼用 Gini / Entropy。

能逐一解釋所有核心公式與符號。

理解 threshold、candidate split、recursive splitting、interaction。

理解 tree depth 如何連到 bias、variance、overfitting、generalization。

知道 pre-pruning、post-pruning 與 cross-validation 如何控制 complexity。

1. Big Picture：這一課到底在學什麼？

上一課主要告訴我們 Decision Tree 可以做 regression 與 classification；這一課進一步回答「樹到底怎樣建出來」。模型從包含全部 training data 的 root node 開始，對不同 feature 與 threshold 逐一試切，計算每個 split 的改善程度，再選擇當下最好的切法。這種策略叫 greedy algorithm。之後，模型對新的 child node 重複同一程序，形成 recursive splitting。

Regression Tree 的目標是把 predictor space 分成多個不重疊 regions，每個 region 輸出一個固定數值；Classification Tree 則希望每個 region 中的 class 越純越好。兩者的建樹骨架相同，但評分 split 的準則不同：Regression 用 RSS reduction；Classification 通常用 Gini / Entropy 所產生的 Information Gain。

Decision Tree 很有彈性，因為每多一層 split 都能令 training data fit 得更細。這也是它的風險：若一路切到 leaf 只剩 1 個 sample，training error 可以非常低甚至接近 0，但 test error 可能反而上升，因為模型開始 memorizing noise。

因此這課不只是「如何建樹」，其實也是一課 model complexity control：tree depth 增加會降低 bias 但提高 variance；太淺會 underfit，太深會 overfit。實務上會用 max_depth、min_samples_split、min_samples_leaf 或 cost-complexity pruning 控制樹大小，並以 cross-validation 選擇適合的 complexity。

整體知識脈絡可以接到你之前學過的 Least Squares → RSS/MSE → Bias–Variance → Regularization → Cross-Validation。Decision Tree 的 pruning，本質上和 L1/L2 regularization 的思想一致：不只追求 training fit，也要限制模型複雜度。

Learning Flow

Training Data↓

Root Node↓

Try feature j + threshold s↓

Evaluate candidate split↓

Regression: ΔRSS / Classification: Information Gain↓

Choose best split↓

Create left/right child↓

Recursive splitting↓

Tree becomes deeper↓

Too deep → memorizing noise↓

Overfitting↓

Pruning / CV

2. Core Concepts 詳細拆解

Concept

一句話定義

在 Decision Tree 中的作用

Feature（特徵）

模型的輸入變數，例如 Age、GPA、Income。

Tree 會逐個 feature 尋找有用的切割點。

Threshold（閾值 / 切割點）

某個 feature 上用來分左右兩邊的數值。

例如 x < 3.2；3.2 就是 threshold。

Split（切分）

用 feature + threshold 把 node 的資料分成 child nodes。

例：GPA < 3.2 → left；GPA ≥ 3.2 → right。

Root Node（根節點）

樹最上層的節點。

一開始包含所有 training data。

Child Node（子節點）

某次 split 後產生的節點。

通常有 left child 與 right child。

Leaf Node（葉節點）

不再繼續 split 的最終節點。

Regression 輸出平均值；Classification 輸出 majority class。

Region（區域）

一連串 split rule 所定義的 predictor-space 子區域。

Regression Tree 在每個 region 內輸出常數。

Greedy Algorithm（貪婪演算法）

每一步選目前改善最大的 split。

計算可行，但不保證 global optimum。

Recursive Splitting（遞迴切分）

在 child node 上重複相同的 split search。

因此 Tree 一層一層長深。

Impurity（不純度）

Classification node 中類別混雜程度。

Gini / Entropy 越低，node 越 pure。

Information Gain（資訊增益）

split 前 impurity 減去 split 後 weighted impurity。

越大表示 split 越有用。

Overfitting（過擬合）

模型過度貼合 training data，連 noise 也記住。

Training error 很低，但 test/generalization 變差。

3. Regression Tree：目標、公式與符號

3.1 Region Prediction

ŷ(x) = ŷ_Rj ,  for x ∈ R_j

Symbol

English

中文

意思

在公式中的作用

x

input / predictor vector

輸入特徵向量

一筆新資料的 features

決定 observation 落在哪個 region

ŷ(x)

prediction

預測值

模型對 x 的輸出

最終回歸預測

R_j

region j

第 j 個區域

Tree 切出的第 j 個子區域

若 x 落在此區域，就用該區常數預測

j

region index

區域編號

j = 1,...,J

標記是哪一個 region

∈

belongs to

屬於

表示 x 位於 R_j

連結 observation 與其 region

ŷ_Rj

regional prediction

區域預測常數

R_j 中 training y 的平均值

該區所有 x 共用同一預測值

Formula in words：只要 observation 落在 R_j，Regression Tree 就輸出該 region 的固定預測值。

Why this formula：Regression Tree 是 piecewise constant model：它不是畫平滑曲線，而是每個 region 用一個常數代表。

3.2 Region Mean

ŷ_Rj = (1 / n_j) Σ_{i∈R_j} y_i

Symbol

English

中文

意思

在公式中的作用

ŷ_Rj

regional mean prediction

區域平均預測

region R_j 的預測常數

作為該 leaf 的預測

n_j

number of samples in region

區域樣本數

落在 R_j 的 observations 數量

用來取平均

Σ

summation

總和符號

把指定 observations 的 y 加起來

求區域內所有 target 的總和

i

observation index

樣本索引

第 i 筆資料

指定哪一筆 training observation

R_j

region j

第 j 個區域

目前 leaf 所對應的區域

限制 summation 只看區域內資料

y_i

observed response

第 i 筆真實目標

真實連續 target

被加總並取平均

Formula in words：把這個 region 中所有真實 y 加起來，再除以該 region 的樣本數。

Why this formula：在平方誤差準則下，常數預測選平均值可以令該 region 的 squared error 最小。

3.3 Formal Objective

arg min_{R₁,…,R_J}  Σ_{j=1}^{J} Σ_{i∈R_j} (y_i − ŷ_Rj)²

Symbol

English

中文

意思

在公式中的作用

arg min

argument that minimizes

令目標最小的解

不是求最小值本身，而是求哪組 regions 最好

選擇最佳 partition

R₁,…,R_J

regions

所有區域

Tree 對 predictor space 的 partition

是要被優化的對象

J

number of regions

區域總數

leaf / region 數量

控制 summation 的範圍

j

region index

區域索引

第 j 個 region

逐區計算誤差

i

sample index

樣本索引

第 i 筆 observation

逐筆計算 residual

y_i

actual response

真實值

第 i 筆 target

與預測比較

ŷ_Rj

region prediction

區域預測值

region R_j 的 y 平均

對 region 中所有 samples 的預測

(y_i−ŷ_Rj)

residual

殘差

真實值減預測值

衡量單筆誤差

²

square

平方

把 residual 平方

避免正負抵消並放大大誤差

Σ

summation

加總

對所有 samples/regions 加總

形成總 RSS

Formula in words：在所有可能的 region 切法中，找出令 training residual squared errors 總和最低的 partition。

Why this formula：理論目標很清楚，但所有可能 partition 組合太多，exact search 在計算上不可行，因此實際使用 greedy splitting。

4. Greedy Regression Split Algorithm

4.1 Left / Right Child

D_L = {(x_i,y_i): x_ij < s}     D_R = {(x_i,y_i): x_ij ≥ s}

Symbol

English

中文

意思

在公式中的作用

D

current-node dataset

目前節點資料集

node 中所有 samples

split 的來源資料

D_L

left-child dataset

左子節點資料

符合 x_ij < s 的 observations

形成左 branch

D_R

right-child dataset

右子節點資料

符合 x_ij ≥ s 的 observations

形成右 branch

x_i

feature vector

第 i 筆特徵向量

一筆 observation 的全部 features

sample 的輸入

y_i

target

第 i 筆目標

該 observation 的真實 y

和 x_i 成對

x_ij

feature value

第 i 筆第 j 個 feature 值

例如第 5 筆的 GPA

拿來與 threshold 比較

j

feature index

特徵索引

正在測試的 feature

決定在哪個 feature 切

s

candidate threshold

候選閾值

正在測試的切割點

決定左右 branch

< / ≥

comparison operators

比較符號

小於 / 大於等於

定義 split rule

Formula in words：在 feature j 上用 threshold s 把 node 中資料分成左、右兩組。

Why this formula：每一個 candidate split 都會生成一組 D_L、D_R，之後比較它們能否降低整體 RSS。

4.2 RSS After Split

RSS_after = Σ_{(x,y)∈D_L}(y−ŷ_L)² + Σ_{(x,y)∈D_R}(y−ŷ_R)²

Symbol

English

中文

意思

在公式中的作用

RSS_after

RSS after split

切分後 RSS

左右 children 的 squared residuals 總和

評估候選 split

D_L / D_R

child datasets

左右資料集

split 後兩邊的 observations

分別計算誤差

y

actual target

真實目標

某筆 sample 的 y

與 child mean 比較

ŷ_L

left prediction

左 child 預測

D_L 中 y 的平均

左 child 所有 samples 共用

ŷ_R

right prediction

右 child 預測

D_R 中 y 的平均

右 child 所有 samples 共用

Σ

summation

加總

把每筆 squared residual 加起來

得到 child RSS

Formula in words：左邊的 squared error 加上右邊的 squared error，就是這一刀之後的總 RSS。

Why this formula：如果 split 把本來不同 y 水平的 observations 分得更好，左右 region 各自會更集中，RSS 就會降低。

4.3 RSS Improvement

ΔRSS = RSS_before − RSS_after

Symbol

English

中文

意思

在公式中的作用

Δ

change / improvement

變化量

Delta 表示前後差

衡量 split 改善多少

RSS_before

RSS before split

切分前 RSS

目前 parent node 的 RSS

baseline

RSS_after

RSS after split

切分後 RSS

左右 children 的總 RSS

candidate split 結果

ΔRSS

RSS reduction

RSS 降幅

切前減切後

越大越好

Formula in words：這一刀讓 RSS 減少了多少。

Why this formula：Tree 要選 ΔRSS 最大的 split，因為代表當下 training fit 改善最多。

4.4 Best Greedy Split

(j*, s*) = arg max_{j,s} ΔRSS

Symbol

English

中文

意思

在公式中的作用

j*

best feature index

最佳特徵索引

帶來最大 RSS reduction 的 feature

決定用哪個 feature 切

s*

best threshold

最佳閾值

帶來最大 RSS reduction 的 threshold

決定在哪裡切

arg max

argument that maximizes

令目標最大的選擇

找出哪個 j,s 使 ΔRSS 最大

選最佳 candidate

j

candidate feature

候選特徵

逐一測試所有 features

search dimension

s

candidate threshold

候選閾值

逐一測試可能切點

search dimension

ΔRSS

RSS improvement

RSS 改善量

切分後下降幅度

split 評分標準

Formula in words：在所有 feature + threshold 候選中，選令 RSS 降最多的一組。

Why this formula：這是 greedy：只保證目前這一步最好，不重新規劃之前的 split，也不保證整棵 tree 是 global optimum。

5. Regression Numerical Example：課程中的第一刀

不切分時，整個 root node 只用一個平均值預測，課程中的 baseline RSS = 649.3。候選 thresholds 如下：

Candidate s

RSS_after

ΔRSS = 649.3 − RSS_after

結論

1.5

607.6

41.7

改善較小

3.2

534.8

114.5

★ 最大改善 → 選它

8.0

555.8

93.5

次佳

第二層在右 child（x ≥ 3.2）再測試 4.0、6.5、9.0；課程中 x = 6.5 的 RSS = 162.4，最低，因此第二刀選 6.5。

最後的 piecewise prediction：x < 3.2 → 1.01；3.2 ≤ x < 6.5 → 3.73；x ≥ 6.5 → 1.04。這就是 Regression Tree 的 staircase / piecewise constant prediction。

6. Classification Tree：Gini、Entropy 與 Information Gain

Classification Tree 的 split 流程與 Regression Tree 一樣，但 target 是 class，所以不能用「距離平均值多少」作主要 splitting criterion。我們改為衡量 node 中 class 有多混雜，也就是 impurity。常見做法是 Gini Impurity 或 Entropy。

6.1 Class Proportion

p̂_{k,L} = (1/|D_L|) Σ_{(x,y)∈D_L} 1(y=k)

Symbol

English

中文

意思

在公式中的作用

p̂_{k,L}

estimated class proportion

左 child 中 class k 的比例

例如 Fraud 佔 80%

估計 class probability

k

class index

類別索引

第 k 個 class

指定正在計算哪一類

D_L

left-child dataset

左子資料集

split 後左邊 samples

計算比例的範圍

|D_L|

size of left child

左子樣本數

D_L 中 observation 數目

作分母

Σ

summation

加總

累加 indicator

計算 class k 的數量

1(y=k)

indicator function

指示函數

若 y=k 則 1，否則 0

把 class k 的 observations 數出來

y

class label

真實類別

sample 的 target class

與 k 比較

Formula in words：數一數左 child 有多少個 class k，再除以左 child 的總 sample 數。

Why this formula：Classification impurity 需要 class proportions；Gini 與 Entropy 都由 p_k 計算。

6.2 Gini Impurity

Gini(D) = 1 − Σ_{k=1}^{K} p̂_{k,D}²

Symbol

English

中文

意思

在公式中的作用

D

node dataset

目前節點資料集

正在評估的 node

計算該 node 的 impurity

Gini(D)

Gini impurity

Gini 不純度

類別混雜程度

越低越 pure

K

number of classes

類別總數

例如 binary classification K=2

決定 summation 範圍

k

class index

類別索引

k=1,...,K

逐類計算

p̂_{k,D}

class proportion

class k 比例

在 D 中 class k 的 sample proportion

平方後加總

²

square

平方

讓 dominant class proportion 的影響更明顯

形成 Gini measure

Σ

summation

加總

加總所有 class 的 p²

計算 concentration

1−

one minus

一減

由 concentration 轉成 impurity

越集中 → Gini 越低

Formula in words：先把每個 class 的比例平方後加起來，再用 1 減掉。

Why this formula：如果某一類佔 100%，Σp²=1，所以 Gini=0；如果 binary 是 50/50，Gini=0.5，代表最混亂。

6.3 Entropy

H(D) = − Σ_{k=1}^{K} p̂_{k,D} log(p̂_{k,D})

Symbol

English

中文

意思

在公式中的作用

H(D)

entropy

熵 / 不純度

資料集 D 的 uncertainty

越低越 pure

D

node dataset

節點資料集

目前 node

計算範圍

K

number of classes

類別數

class 總數

sum 的上限

k

class index

類別索引

逐一 class

sum 的 index

p̂_{k,D}

class proportion

class k 比例

D 中第 k 類比例

反映 class distribution

log

logarithm

對數

通常以 2 或自然對數

把 probability 轉成 information scale

−

negative sign

負號

因 log(p≤1) ≤ 0

令 entropy 為非負

Σ

summation

加總

把各 class 的 uncertainty contribution 加起來

得到總 entropy

Formula in words：每個 class 以 p log p 衡量其 uncertainty，再全部加總。

Why this formula：Pure node 只有一類，因此 entropy=0；class 越平均，uncertainty 越高。

6.4 Weighted Impurity After Split

I_after = (n_L/n) I(D_L) + (n_R/n) I(D_R)

Symbol

English

中文

意思

在公式中的作用

I

impurity function

不純度函數

可代表 Gini 或 Entropy

統一表示 impurity

I_after

weighted impurity after split

切分後加權不純度

左右 child impurity 的 weighted average

評估 split 後品質

D_L / D_R

child datasets

左右子節點資料

split 結果

各自計算 impurity

n_L / n_R

child sample counts

左右樣本數

兩個 children 的 observations 數

形成權重

n

parent sample count

父節點樣本總數

n=n_L+n_R

權重分母

n_L/n

left weight

左權重

左 child 佔 parent 的比例

避免小 child 與大 child 被同等看待

n_R/n

right weight

右權重

右 child 佔 parent 的比例

同上

Formula in words：切分後的不純度不是簡單左右平均，而是按左右 child 的 sample size 加權。

Why this formula：如果一邊只有 1 個 sample、另一邊有 99 個，兩邊不應被視為同等重要。

6.5 Information Gain

ΔI = I_before − I_after

Symbol

English

中文

意思

在公式中的作用

ΔI

impurity reduction / information gain

不純度下降量 / 資訊增益

split 前減 split 後

越大越好

I_before

impurity before split

切分前不純度

parent node 的 impurity

baseline

I_after

weighted impurity after split

切分後加權不純度

children 的 weighted impurity

candidate split outcome

Δ

change

變化量

表示下降多少

split 的改善量

Formula in words：比較切分前後 impurity，下降越多代表 children 越 pure。

Why this formula：Classification Tree 會選 Information Gain 最大的 split。

7. Gini 手算例子

假設某 node 有 10 筆：8 Red、2 Blue。

p(Red)=8/10=0.8；p(Blue)=2/10=0.2

Gini = 1 − (0.8² + 0.2²) = 1 − (0.64 + 0.04) = 0.32

若是 10 Red、0 Blue：Gini = 1 − (1² + 0²) = 0 → 完全純。

若是 5 Red、5 Blue：Gini = 1 − (0.5² + 0.5²) = 0.5 → binary case 最混亂。

8. XOR、Recursive Splitting 與 Interaction

XOR dataset 的四個象限呈交叉類別：左上與右下可能為同一 class，左下與右上為另一 class。單獨只切 x₁ 或只切 x₂，通常兩邊仍會混有兩類，因此第一刀 Information Gain 可能很小。

但先用 x₁ ≤ 0 把資料分成左右，再在左 child 用 x₂ ≤ 0 切，就可以把左半邊分成兩個更 pure regions。這說明第二個 feature 的作用取決於第一個 split 所定義的 region。

Interaction 的直覺：『x₂ 是否重要，取決於 x₁ 在哪個區域。』Decision Tree 用 nested / conditional splits 自然學到 interaction；不像 linear model 通常要手動加入 x₁x₂ interaction term。

9. Overfitting：為什麼 Deep Tree 很危險？

每多一次 split，Tree 都能把 training data 分得更細，因此 training fit 通常只會改善。若一直切到每個 leaf 只剩 1 個 sample，Regression training error 可以接近 0；Classification training accuracy 可以接近 100%。

但這不代表 generalization 好。模型可能把 sample-specific noise、measurement error、偶然波動也當成真正規律。因此 test error 可能在 tree depth 增加到某一點後重新上升。

9.1 Bias–Variance Cause-and-Effect

Tree depth ↑ → number of splits ↑ → model complexity ↑ → training error ↓

Tree depth ↑ → model 對 training-set 細節更敏感 → variance ↑ → overfitting risk ↑

Shallow tree → simple rules → bias ↑、variance ↓ → underfitting risk ↑

Deep tree → flexible rules → bias ↓、variance ↑ → overfitting risk ↑

Best complexity ≠ deepest tree；通常是 validation/test error 最低的 sweet spot。

10. 控制 Tree Size：Pre-Pruning 與 Post-Pruning

方法 / 參數

中文

控制什麼

增加 / 設更嚴格後的效果

max_depth

最大深度

Tree 最多可長幾層

depth 上限↓ → complexity↓ → variance↓ → bias↑

min_samples_split

最小分裂樣本數

node 至少多少 samples 才能再 split

值↑ → 更少 nodes 可 split → tree 更簡單

min_samples_leaf

最小葉節點樣本數

每個 leaf 至少要多少 samples

值↑ → 避免 tiny leaves → variance↓

Post-pruning

後剪枝

先長大 tree，再刪除不值得 branches

降低 complexity，改善 generalization

10.1 Cost-Complexity Pruning（概念公式）

R_α(T) = R(T) + α |T|

Symbol

English

中文

意思

在公式中的作用

R_α(T)

penalized tree objective

帶複雜度懲罰的樹目標

fit + complexity penalty

選 pruning 後 tree

T

tree

決策樹

某一棵 candidate tree

被評估的模型

R(T)

training loss / risk

樹的訓練誤差

例如 RSS 或分類誤差

衡量 fit

α

complexity parameter

複雜度懲罰係數

控制 tree size penalty strength

α 越大越偏好簡單 tree

|T|

tree size

樹大小

通常可代表 leaf 數

複雜度項

+

tradeoff

加總

把 fit 與 complexity 合併

形成 regularized objective

Formula in words：一棵 tree 不只要 training error 小，也要避免太複雜；complexity 需要付 penalty。

Why this formula：α ↑ → complexity penalty ↑ → 更多 branches 被剪掉 → tree 更小 → variance 通常下降、bias 可能上升。

10.2 與 L1/L2 Regularization 的連接

概念

Linear / Logistic

Decision Tree

Fit

Loss / RSS

Tree error / impurity

Complexity penalty

λ × coefficient penalty

α × tree size

目的

避免 coefficients 過度自由

避免 tree 過深 / branches 過多

效果

降低 variance、改善 generalization

降低 variance、改善 generalization

11. Regression Tree vs Classification Tree

項目

Regression Tree

Classification Tree

Target

Continuous y

Categorical y

Leaf prediction

region 中 y 的平均值

majority class / class probability

Split criterion

RSS reduction / MSE reduction

Gini / Entropy reduction

Best split

最大 ΔRSS

最大 Information Gain

Pure / good node

y 值集中在平均附近

class 比例高度集中

Overfitting

leaf 太小、tree 太深

leaf 太小、tree 太深

12. 最容易搞錯的地方

「ΔRSS 越小越好」：錯。RSS_after 越小越好，但 ΔRSS = before−after，所以 ΔRSS 越大越好。

「Gini 越大越 pure」：錯。Gini 越低越 pure；Gini=0 表示完全單一 class。

「Training error 最低就是最佳模型」：錯。太深 tree 可把 training set 記住，但 test error 可能升高。

「Greedy = 找到 global optimum」：錯。Greedy 只選每一步目前最好的 split。

「min_samples_split = min_samples_leaf」：不同。前者看 parent 是否有資格切；後者限制切完後每個 leaf 最少樣本數。

「Interaction 一定要手動加 x₁x₂」：對線性模型常見，但 Tree 可用 sequential conditional splits 自動形成 interaction。

13. ML Concept Map：把這一課接回之前的知識

Least Squares → RSS / Squared Error

→ RSS → Regression Tree split criterion

→ Classification → class probability → Gini / Entropy → Information Gain

→ Threshold → candidate split → recursive splitting → regions

→ Recursive splitting → interactions / nonlinear decision boundaries

→ Tree depth ↑ → complexity ↑ → bias ↓ + variance ↑

→ Variance ↑ → overfitting risk ↑ → test error may rise

→ Pruning / min samples / max depth → complexity control

→ Cross-Validation → choose complexity → better generalization

→ Next step: Bagging / Random Forest / Boosting → reduce single-tree instability and improve predictive performance

14. Concept Q&A Flashcards（20 題）

Q1. Decision Tree 怎樣選 Regression 的最佳 split？

A：計算每個 candidate split 的 RSS_after，再選 ΔRSS = RSS_before − RSS_after 最大者。

Q2. 為什麼 Regression leaf 用 mean？

A：因為在 squared-error loss 下，平均值是令區域內 squared errors 最小的常數。

Q3. Threshold 是什麼？

A：某個 feature 上的切割值，例如 x < 3.2 中的 3.2。

Q4. Greedy 是什麼？

A：每一步只選當下改善最大的 split，不保證整棵 tree 的 global optimum。

Q5. Classification 為何不用 RSS？

A：因為 target 是 class；我們更關心 class 是否 pure，而非距離平均值多少。

Q6. Gini=0 代表什麼？

A：node 完全純，所有 samples 屬同一 class。

Q7. Binary classification 50/50 的 Gini？

A：0.5，是最混亂情況。

Q8. Information Gain 越大代表什麼？

A：split 令 impurity 降得越多，children 越 pure。

Q9. 為什麼 impurity after split 要 weighted？

A：因為左右 child sample size 可能不同，大 child 應有較大影響。

Q10. Entropy 和 Gini 有何共同點？

A：都量 class impurity；越低通常越 pure。

Q11. XOR 為何能展示 interaction？

A：單一 feature 不足以分開 classes；第二個 feature 的作用依賴第一個 split 所定義的 region。

Q12. Tree depth 增加，training error 通常怎樣？

A：下降或不增加，因模型 flexibility 增加。

Q13. Tree depth 增加，variance 通常怎樣？

A：增加，因 tree 對 training data 的細節更敏感。

Q14. 什麼情況是 overfitting？

A：training performance 很好但 test/generalization 明顯較差。

Q15. max_depth 是什麼？

A：限制 tree 的最大深度，屬 pre-pruning。

Q16. min_samples_split 與 min_samples_leaf 差別？

A：split 看 parent 至少多少 samples 才能切；leaf 看 child 最少必須保留多少 samples。

Q17. Post-pruning 是什麼？

A：先長一棵較大 tree，再刪除不值得的 branches。

Q18. α 增加在 cost-complexity pruning 中會怎樣？

A：complexity penalty 變強，tree 通常被剪得更小。

Q19. 為什麼不能用 training error 選最深 tree？

A：training error 偏好更複雜模型，容易導致 overfitting。

Q20. Cross-validation 在這課的作用？

A：用 validation performance 選 max depth / pruning strength 等 complexity，而非只看 training fit。

15. 五段完整總結

第一，這一課的核心是解釋 Decision Tree 如何真正建出來。模型從包含全部 training data 的 root node 開始，逐一測試不同 feature 與 threshold，把資料分成 left/right child。因為一次搜尋所有可能 tree structures 在計算上不可行，所以實務採用 greedy algorithm：每一步選目前改善最多的 split，再在 child node 重複相同程序。

第二，Regression Tree 把 predictor space 分成多個不重疊 regions，每個 region 輸出該區 training y 的平均值，因此 prediction 是 piecewise constant。理想目標是令所有 regions 的 RSS 最小；實際建樹時，對每個 candidate split 計算 RSS_after，再用 ΔRSS = RSS_before − RSS_after 評分，選 ΔRSS 最大的 feature 與 threshold。

第三，Classification Tree 的結構相同，但 target 是類別，因此通常用 Gini Impurity 或 Entropy 評估 node 的混亂程度。Gini=0 代表完全 pure；Information Gain 等於切分前 impurity 減去切分後左右 child 的 weighted impurity。最佳 classification split 就是令 Information Gain 最大的 split。課程的 XOR 例子進一步展示，Tree 可以透過 sequential conditional splits 自然捕捉 feature interaction。

第四，Tree 的靈活性同時也是它最大的風險。隨著 tree depth 增加，training error 會持續下降；若一路切到每個 leaf 只有一個 sample，模型甚至能把 training data 幾乎完全記住。但此時 variance 很高，模型容易把 noise 當成 signal，導致 test error 上升，形成 overfitting。這正好連到 Bias–Variance Tradeoff：淺 tree bias 高、variance 低；深 tree bias 低、variance 高。

第五，因此 Decision Tree 必須做 complexity control。Pre-pruning 可用 max_depth、min_samples_split、min_samples_leaf；Post-pruning 則先長較大 tree，再以 cost-complexity criterion 剪枝。這和 L1/L2 regularization 的思想一致：在 fit 與 complexity 之間取得平衡。實務上再配合 cross-validation 選擇最合適的 tree complexity，目標不是 training error 最低，而是 generalization 最好。

16. 15 句必記精華

1. Decision Tree 的建樹本質是反覆尋找「最佳 feature + threshold」。

2. Regression Tree 每個 leaf 通常預測該 region 的 y 平均值。

3. Regression Tree 是 piecewise constant model，而不是平滑曲線模型。

4. Regression split 用 ΔRSS = RSS_before − RSS_after 評分，ΔRSS 越大越好。

5. Threshold 是 feature 上的切割點，例如 x < 3.2。

6. Greedy algorithm 只保證當下最佳 split，不保證 global optimum。

7. Recursive splitting 是在 child node 上重複同一 split-search procedure。

8. Classification Tree 通常用 Gini 或 Entropy 衡量 impurity。

9. Gini 越低表示 node 越 pure；Gini=0 表示完全純。

10. Information Gain = split 前 impurity − split 後 weighted impurity，越大越好。

11. XOR 說明單一 feature 可能不夠，但多層 conditional splits 可以捕捉 interaction。

12. Tree depth 增加通常令 training error 下降，但 variance 與 overfitting risk 上升。

13. Shallow tree 容易 high bias / underfit；deep tree 容易 high variance / overfit。

14. max_depth、min_samples_split、min_samples_leaf 都是 pre-pruning complexity controls。

15. 最佳 Tree 不是 training error 最低的 Tree，而是 cross-validation / unseen data 上 generalization 最好的 Tree。

17. 我真的懂了嗎？Checklist

☐ ⭐ 我能不用公式解釋 Tree 如何由 root node 長出來。

☐ ⭐ 我知道 threshold、split、leaf、region、recursive splitting 的分別。

☐ ⭐ 我可以解釋 Regression Tree 為什麼用 mean prediction。

☐ ⭐ 我知道 RSS、ΔRSS 公式每一個符號的意思。

☐ ⭐ 我知道 Classification 為什麼用 Gini / Entropy。

☐ ⭐ 我能手算 binary Gini。

☐ ⭐ 我知道 Information Gain 為什麼要使用 weighted impurity。

☐ ⭐ 我可以用 XOR 解釋 interaction。

☐ ⭐ 我可以解釋 depth ↑ 為什麼令 variance ↑。

☐ ⭐ 我知道 training error 很低不等於 generalization 好。

☐ 我知道 max_depth、min_samples_split、min_samples_leaf 的差別。

☐ 我知道 pre-pruning 與 post-pruning 的差別。

☐ 我可以解釋 α ↑ 如何影響 cost-complexity pruning。

☐ 我知道 cross-validation 為什麼比 training error 更適合選 tree complexity。

☐ 我能把這課連到 Bias–Variance、Regularization、Cross-Validation。

附錄：TBA 學習卡片

以下卡片與筆記內容對應，可作快速複習。

TBA1

TBA2

TBA3

TBA4

TBA5

TBA6

TBA7

TBA8

TBA9

TBA10

## Connections

[[Supervised Learning MOC]] · [[Supervised Learning - Module 5 MOC]] · [[Pruning]] · [[Tuning & Interpretation]]

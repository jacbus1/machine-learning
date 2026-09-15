---
course: Supervised Learning
module: 3
status: curated
tags:
  - supervised
  - module-3
  - prediction
  - regression
publish: true
---

# The Loss Function in Logistic Regression

> [!info] Learning position
> Supervised Learning → Module 3 → Topic 12

## Logistic_Regression_Loss_Function_逐頁詳細分析

The Loss Function in Logistic Regression

Logistic Regression Loss Function｜逐頁詳細分析與淺白筆記

依據：課程 PDF（10 頁）＋影片逐字稿

這份筆記的目標  不是只抄 slide，而是把每頁背後的數學脈絡串起來：為什麼 Logistic Regression 要用 Log Loss、它如何由 Bernoulli likelihood 推導、為什麼要取 log、為什麼最後變成「最小化負 log-likelihood」，以及模型如何用 gradient descent 學習。

0. 先看整個單元的脈絡

整個單元其實只是在回答一條主線問題：Logistic Regression 預測的是「機率」，那麼怎樣衡量這些機率預測有多好，並用這個衡量方式去找最佳參數？

① Logistic Regression 輸出機率  先算 z = β₀ + β₁x₁ + … + βₚxₚ，再經 sigmoid 變成 ŷ = P(y=1|x)。

② 二元結果用 Bernoulli 表示  因為 y 只有 0 或 1，可以用一條 Bernoulli 公式同時表示「成功」與「失敗」的機率。

③ 多筆資料組成 Likelihood  希望目前參數令「我們實際觀察到的全部結果」盡可能有高機率，因此把每筆資料的機率相乘。

④ 乘積改成 Log-Likelihood  很多 0～1 之間的小數連乘會非常細；取 log 後，乘法變加法，更易運算及最佳化。

⑤ 最大化 likelihood = 最小化 loss  最大化 log-likelihood 等價於最小化 negative log-likelihood；這個 negative log-likelihood 就是 binary cross-entropy / log loss。

⑥ 用 Gradient Descent 找參數  Logistic Regression 不像普通 OLS 有簡單 closed-form normal equation，因此通常用數值最佳化逐步降低 loss。

z = β₀ + Σⱼ βⱼxⱼ   →   ŷ = σ(z) = 1 / (1 + e^(−z))

ŷ 是模型預測 y=1 的機率

Loss = −[ y·ln(ŷ) + (1−y)·ln(1−ŷ) ]

單一樣本的 binary log loss / cross-entropy

必須先分清楚的三個詞

名詞

想法

訓練時方向

Likelihood

目前參數下，觀察到這批真實標籤的「可能性」

越大越好

Log-Likelihood

對 likelihood 取自然對數；把乘法變加法

越大越好

Negative Log-Likelihood / Log Loss

把 log-likelihood 加負號，變成 loss

越小越好

PDF 第 1 頁｜單元標題：The Loss Function in Logistic Regression

原 PDF 第 1 頁

這頁的作用

這是標題頁，真正重要的是它把「Logistic Regression」和「Loss Function」連在一起。前面的 Linear Regression 通常以平方誤差衡量預測錯多少；這個單元則轉到分類問題：模型輸出的不是任意實數，而是 0 到 1 的機率，因此 loss 的設計也不同。

一句話  Linear Regression 問「預測數值差幾多？」；Logistic Regression 問「你給真實結果多大機率？」

影片開場特別把本單元和 regression section 的 loss function 對比：普通 regression 可以推導出最佳參數的 closed-form 解，而 logistic regression 最終會走向數值最佳化（gradient descent）。這個對比是後面第 7–8 頁的伏筆。

PDF 第 2 頁｜Contents of This Video

原 PDF 第 2 頁

六個學習目標逐一翻譯

What is a loss function and why we need it  loss function 是模型的「扣分規則」。沒有 loss，就無法定量比較兩組參數誰比較好。

Log loss (cross-entropy) formula  學會單一樣本與整個 dataset 的 binary cross-entropy 公式。

Connection to probability and likelihood  知道這條公式不是硬背，而是由 Bernoulli probability → likelihood → log-likelihood 推導出來。

Visual understanding of the loss behavior  理解「越自信地答錯，懲罰越大」；這正是 log loss 的核心性格。

How the model learns by minimizing loss  把 loss 當成要下山的高度，透過 gradient descent 改變 β / w 與 b。

Practical implications for student prediction  用學生 Pass/Fail 的機率預測實例手算 loss，看到哪一筆最拖累模型。

學習順序建議  不要一開始死背第 4 頁公式。先理解第 3、5 頁的「錯得有多嚴重」，再看第 6、7 頁為什麼機率論自然導出這條 loss，公式會容易記很多。

PDF 第 3 頁｜What is a Loss Function?

原 PDF 第 3 頁

1. Loss Function 到底是什麼？

Slide 的定義是：loss function 衡量模型預測和真實結果相比「錯得有幾多」。在 student classification 中，真實 y 是 Pass=1 / Fail=0，而模型輸出可以是 ŷ=0.7，意思是「預測有 70% 機率會 Pass」。

重點：ŷ=0.7 本身不是最後的 0/1 類別，它首先是一個 probability。分類閾值（例如 0.5）可以之後才做；訓練 loss 直接使用這個機率，所以 0.51 和 0.99 即使都被分類為 Pass，loss 仍然會把它們看成完全不同的預測信心。

2. 右邊圖表怎樣看

圖中的柱代表每位學生的 predicted probability，白色 × 則代表真實 label（1 或 0）。如果真實是 1，柱越接近 1 越好；如果真實是 0，柱越接近 0 越好。

例如真實 Pass (y=1)，預測 ŷ=0.8：方向正確，而且頗有信心，loss 應較低。

真實 Fail (y=0)，預測 ŷ=0.2：模型只給 20% Pass 機率，即 80% Fail 機率，也是不錯的預測。

真實 Pass (y=1)，預測 ŷ=0.6：仍偏向 Pass，但信心較弱，loss 會比 0.8 更高。

真實 Fail (y=0)，預測 ŷ=0.7：方向錯而且有一定信心，loss 會明顯增加。

核心目標  Find model parameters that minimize total loss。也就是找一組 β / w 和 bias b，使整批資料的平均錯誤成本最低。

PDF 第 4 頁｜The Log Loss Formula

原 PDF 第 4 頁

1. 單一樣本公式

L(y, ŷ) = −[ y·ln(ŷ) + (1−y)·ln(1−ŷ) ]

符號：y 是真實標籤，只能是 0 或 1；ŷ 是模型預測 y=1 的機率；ln 是 natural logarithm（自然對數）。

2. 其實公式會自動「二選一」

真實 y

代入後

實際 loss

意思

1 (Pass)

−[1·ln(ŷ)+0·ln(1−ŷ)]

−ln(ŷ)

只關心模型給真實 Pass 的機率有多高

0 (Fail)

−[0·ln(ŷ)+1·ln(1−ŷ)]

−ln(1−ŷ)

只關心模型給真實 Fail 的機率 1−ŷ 有多高

3. 為什麼外面要有負號？

因為 0<機率≤1 時，ln(probability) ≤ 0。例如 ln(0.9)≈−0.105。若直接當「分數」，好的預測反而是接近 0 的負數；加上負號後，好的預測變成小的正 loss，而非常錯的預測變成很大的正 loss，符合「loss 越小越好」的習慣。

4. 整個 dataset 的 Cost / Objective

J(w,b) = −(1/m) Σᵢ₌₁ᵐ [ y⁽ⁱ⁾ln(ŷ⁽ⁱ⁾) + (1−y⁽ⁱ⁾)ln(1−ŷ⁽ⁱ⁾) ]

就是把每個樣本的 log loss 加起來，再除以 m 取平均。訓練 Logistic Regression 的核心就是找 w,b 令 J(w,b) 最小。

記憶法  y=1 → 看 ŷ；y=0 → 看 1−ŷ。模型給「真實答案」的機率越接近 1，loss 越接近 0。

PDF 第 5 頁｜Understanding Log Loss Behavior

原 PDF 第 5 頁

左圖：真實 y=1（學生其實 Pass）

L = −ln(ŷ)

ŷ→1：−ln(ŷ)→0，所以 loss 越來越小。預測 90%、99% Pass 都屬於低 loss。

ŷ→0：−ln(ŷ)→∞。如果學生其實 Pass，你卻幾乎 100% 認定他 Fail，會受到極大懲罰。

右圖：真實 y=0（學生其實 Fail）

L = −ln(1−ŷ)

ŷ→0：1−ŷ→1，loss→0，因為模型正確給了高 Fail 機率。

ŷ→1：1−ŷ→0，loss→∞，因為模型非常自信地說 Pass，但真實是 Fail。

最重要的直覺：Log Loss 懲罰「自信地答錯」

情境

計算

Loss

真實 y=1, ŷ=0.9

−ln(0.9)

≈0.105

真實 y=1, ŷ=0.6

−ln(0.6)

≈0.511

真實 y=1, ŷ=0.1

−ln(0.1)

≈2.303

真實 y=1, ŷ=0.01

−ln(0.01)

≈4.605

為何這個性質好？  若模型輸出機率，我們不只希望它「分類方向對」，還希望它的信心有意義。把錯誤答案說成 99% 確定，比說成 55% 確定更應受到懲罰；log loss 正好反映這點。

PDF 第 6 頁｜Connection to Probability Theory

原 PDF 第 6 頁

這頁是整個單元的數學核心：Log Loss 不是憑空出現

影片先用 biased coin 介紹 Bernoulli distribution。二元事件只有 0 / 1，例如 heads/tails、Fail/Pass。若 θ 是 y=1 的機率，Bernoulli 可以用一條公式同時涵蓋 y=1 和 y=0。

P(y | x) = ŷʸ (1−ŷ)^(1−y)

這裡 ŷ = P(y=1|x)

1. 為什麼這一條式可以同時表示 0 和 1？

若 y=1：P = ŷ¹(1−ŷ)⁰ = ŷ。

若 y=0：P = ŷ⁰(1−ŷ)¹ = 1−ŷ。

因此 exponent y 與 1−y 就像「開關」，會自動選中符合真實標籤的那一邊。

2. 多位學生：Likelihood 是每筆觀察機率的乘積

L(w,b) = ∏ᵢ₌₁ᵐ [ (ŷ⁽ⁱ⁾)^(y⁽ⁱ⁾) · (1−ŷ⁽ⁱ⁾)^(1−y⁽ⁱ⁾) ]

影片的直覺是：如果學生實際 Pass，就希望模型給 Pass 很高機率；如果學生實際 Fail，就希望模型給 Fail 很高機率。對整批學生，我們希望「所有已觀察到結果」的聯合機率盡量大。講師在推導中假設各學生樣本彼此獨立，於是 joint probability 可以寫成乘積。

3. 為什麼要取 log？｜Log-Likelihood 與 Logistic Regression 的連接

很多 0 到 1 之間的概率連乘，很快會變成極小數，例如 0.9×0.8×0.7×…，數值計算容易 underflow，而且微分與最佳化也較麻煩。利用 log(ab)=log(a)+log(b)，乘積可以變成加總。

ℓ(w,b) = Σᵢ₌₁ᵐ [ y⁽ⁱ⁾ln(ŷ⁽ⁱ⁾) + (1−y⁽ⁱ⁾)ln(1−ŷ⁽ⁱ⁾) ]

這就是 log-likelihood；最大化它等價於最大化原 likelihood

4. Logistic Regression 的 ŷ 從哪裡來？

z = β₀ + Σⱼ βⱼxⱼ   ;   ŷ = σ(z) = 1/(1+e^(−z))

影片逐字稿把 Bernoulli 和 logistic regression 連起來：每個學生因為 x（例如 study hours）不同，會得到不同 z，也就得到不同 ŷ。訓練的本質就是改 β，使實際發生的 y 在整批資料上獲得更高 probability。

PDF 第 7 頁｜Minimize negative log-likelihood = minimize loss

原 PDF 第 7 頁

這頁雖然只有一句，但它是整個推導的「轉折點」

前一頁談 likelihood / log-likelihood，方向是「越大越好」；Machine Learning 的 loss 慣例則是「越小越好」。所以只要把 log-likelihood 乘以 −1，就可以由 maximizing 問題變成 minimizing 問題。

maximize ℓ(w,b)   ⇔   minimize [−ℓ(w,b)]

−ℓ(w,b) = −Σ [ y ln(ŷ) + (1−y) ln(1−ŷ) ]

若再除以樣本數 m，便得到第 4 頁的平均 log loss / binary cross-entropy objective。換句話說：

等價關係  Maximum Likelihood Estimation (MLE) → maximize likelihood → maximize log-likelihood → minimize negative log-likelihood → minimize binary cross-entropy / log loss。

常見混淆

Likelihood 不是 loss：likelihood 越大越好；loss 越小越好。

Log-likelihood 通常是負數或 0，不代表「差」；它只是 log(probability) 的結果。

Negative log-likelihood 才直接變成我們常用的非負損失觀念。

PDF 第 8 頁｜How the Model Learns

原 PDF 第 8 頁

Optimization Process：模型實際怎樣學？

先給 coefficients / weights w 和 bias b 一組初始值（slide 說 random coefficients and bias）。

對所有學生計算 z，再經 sigmoid 得到 predicted probabilities ŷ。

用 log loss 計算每筆樣本的 loss，最後求平均 total / average loss。

調整 w,b，令 loss 下降。

重複以上步驟，直到 loss 不再明顯下降或達到停止條件。

Gradient Descent 的直覺

把 J(w,b) 想像成一座山的高度。gradient 告訴你「往哪個方向上升最快」，所以 gradient descent 就沿相反方向走，逐步把 loss 降低。

parameter ← parameter − learning_rate × gradient

右邊曲線顯示 training iteration 增加時 average loss 從高位快速下降，之後逐漸變平，表示逐步接近收斂（convergence）。

為什麼不像 Linear Regression 一樣一次計出答案？

影片明確對比 OLS：在線性回歸中，可以由 normal equation / matrix inverse 得到 closed-form 解；在 logistic regression 中，加入 sigmoid 後，對參數的一階條件無法像 OLS 那樣整理成一次矩陣求逆直接得到最佳 β，因此使用 iterative numerical optimization。

考試／理解重點  你不一定要在這一頁手推 gradient，但要知道：loss 是 objective，gradient descent 是找 minimum 的方法；兩者不是同一樣東西。

PDF 第 9 頁｜Practical Example

原 PDF 第 9 頁

三位學生逐筆手算

學生

真實 y

預測 ŷ=P(Pass)

應使用的式

Loss

A

1

0.9

−ln(0.9)

0.105 ≈ 0.11

B

0

0.2

−ln(1−0.2)=−ln(0.8)

0.223 ≈ 0.22

C

1

0.3

−ln(0.3)

1.204 ≈ 1.20

Average Loss = (0.11 + 0.22 + 1.20) / 3 ≈ 0.51

為什麼 Student C 對 total loss 貢獻最大？

C 真實是 Pass (y=1)，但模型只給 30% Pass 機率。這表示模型不只是「信心不足」，而且偏向錯誤類別（若 threshold=0.5，會判成 Fail）。所以 −ln(0.3) 明顯大於 A 和 B 的 loss。

這個例子也說明：average loss 不是單純數「答對幾多題」。A、B、C 每筆的機率信心都不同，所以即使兩個模型 classification accuracy 一樣，它們的 log loss 仍可能不同。

實務讀法  Loss 大的樣本代表模型對真實結果分配的 probability 太低。訓練時這些樣本會產生較強的「修正壓力」，促使參數調整。

PDF 第 10 頁｜What We’ve Covered

原 PDF 第 10 頁

逐點總結

Loss functions measure prediction quality  loss 是訓練時的量化目標，不只是最後的 accuracy 指標。

Log loss penalizes confident wrong predictions  給錯誤答案越高信心，loss 非線性地急升。

Mathematical connection to probability theory  binary cross-entropy 可由 Bernoulli likelihood 和 maximum likelihood 推導。

Gradient descent minimizes loss during training  最佳化演算法反覆更新參數，沿 loss 下降方向前進。

Practical examples with student predictions  手算時只要記 y=1 看 −ln(ŷ)，y=0 看 −ln(1−ŷ)。

這個單元真正要你記住的 5 句話

Logistic Regression 先輸出 P(y=1|x)，即一個 0～1 的 probability。

Binary outcome 用 Bernoulli distribution 表示最自然。

我們希望真實發生的全部 y 在模型下有最大 likelihood。

最大化 log-likelihood 等價於最小化 negative log-likelihood，也就是 log loss / binary cross-entropy。

Logistic Regression 通常用 iterative optimization（如 gradient descent）而不是 OLS closed-form 解。

11. 一頁式公式與記憶總表

A. 從輸入到機率

z = β₀ + β₁x₁ + … + βₚxₚ

ŷ = σ(z) = 1/(1+e^(−z)) = P(y=1|x)

B. Bernoulli：用一條式包住 y=0/1

P(y|x) = ŷʸ(1−ŷ)^(1−y)

C. 單一樣本 Log Loss

L = −[y ln(ŷ) + (1−y) ln(1−ŷ)]

y=1 → L=−ln(ŷ)；y=0 → L=−ln(1−ŷ)。

D. 全資料平均 Cost

J(w,b)=−(1/m) Σ [y⁽ⁱ⁾ln(ŷ⁽ⁱ⁾)+(1−y⁽ⁱ⁾)ln(1−ŷ⁽ⁱ⁾)]

E. Likelihood 關係

Likelihood ↑  ⇔  Log-Likelihood ↑  ⇔  Negative Log-Likelihood ↓  ⇔  Log Loss ↓

F. Gradient Descent

w ← w − α ∂J/∂w   ;   b ← b − α ∂J/∂b

α = learning rate

超短記憶法  「真實答案的機率越高，loss 越低；自信答錯，loss 爆升。」這一句就能串起第 3、4、5、9 頁。

12. 容易出錯的地方

把 ŷ 當成 0/1 label  ŷ 在 loss 公式中是 probability；例如 0.73，而不是 threshold 後的 1。

忘記 y=0 時要看 1−ŷ  因為 ŷ 定義為 P(y=1)，所以 P(y=0)=1−ŷ。

最大化 loss  錯。Likelihood / log-likelihood 最大化；negative log-likelihood / loss 最小化。

以為所有錯誤一樣嚴重  Log loss 會按照預測信心決定懲罰程度。

把 gradient descent 當 loss function  Log loss 是 objective；gradient descent 是 optimizer。

以為 logistic regression 可像 OLS 一次矩陣求逆  本課逐字稿特別指出 logistic regression 沒有同樣的 closed-form matrix inverse 解法，因此使用 iterative optimization。

13. 最終脈絡圖（文字版）

Binary classification（y∈{0,1}）

↓

Linear score z = β₀ + βᵀx

↓

Sigmoid → probability ŷ = P(y=1|x)

↓

Bernoulli probability P(y|x)=ŷʸ(1−ŷ)^(1−y)

↓

All samples → Likelihood = product of probabilities

↓

Take log → sum of log probabilities

↓

Add minus sign → Negative Log-Likelihood / Binary Cross-Entropy

↓

Minimize J(w,b) with Gradient Descent

↓

Parameters gradually fit the observed labels better

## Connections

[[Supervised Learning MOC]] · [[Supervised Learning - Module 3 MOC]] · [[Multiclass Classification Evaluation]] · [[Why Classification]]

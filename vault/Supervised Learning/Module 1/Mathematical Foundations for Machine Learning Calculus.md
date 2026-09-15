---
course: Supervised Learning
module: 1
status: curated
tags:
  - supervised
  - module-1
  - calculus
  - mathematics
publish: true
---

# Mathematical Foundations for Machine Learning Calculus

> [!info] Learning position
> Supervised Learning → Module 1 → Topic 3

## ML_Calculus_超詳細初學者筆記

Calculus for Machine Learning

超詳細初學者筆記｜由零開始到 Gradient Descent

CU Boulder Mathematical Foundations for Machine Learning — Calculus & Optimization 整理

適合你如果：  你對 calculus 幾乎沒有基礎，需要逐個符號、逐條 rule、逐步例子、mixed 題目，以及把 derivative 連回 Machine Learning。

核心主線

Model → Prediction → Loss → Derivative / Gradient → Update Parameters → Lower Loss

版本：2026-08-26

目錄

1. Learning as Optimization：ML 為何是最佳化問題

2. Function：y = f(x) 是什麼

3. Slope、Δ 與 Derivative

4. Minimum：為何 derivative = 0

5. Loss Function 與 squared error

6. 七大 Derivative Rules

7. 如何判斷用哪條 Rule

8. Chain Rule 超詳細拆解

9. Mixed Rules 綜合例子

10. Sigmoid Derivative 完整推導

11. Partial Derivative 與 Gradient

12. Gradient Descent 與 Learning Rate α

13. 從 Loss 到最優 b₀：完整 ML 例子

14. 常見混淆與 FAQ

15. 練習題＋答案

16. 最後 Cheat Sheet

1. Learning as Optimization：ML 為何是最佳化問題

Machine Learning 的核心可以先用一句說話理解：模型有一些可以調整的參數，我們希望找到一組參數，令模型的 prediction error（Loss）最小。

θ̂ = arg min_θ L(θ)

讀法：找出令 L(θ) 最小的那組 θ。

θ（theta）：模型參數的總稱；可以只有 1 個，也可以有幾百萬、幾十億個。

L(θ)：Loss function，表示使用這組參數時模型有多錯。

min：要令 Loss 盡量小。

arg min：問的不是「最小 Loss 是幾多」，而是「哪組參數令 Loss 最小」。

直覺  把訓練想像成「調校旋鈕」。每組 θ 是一個旋鈕設定；Loss 告訴你目前有幾差；calculus 告訴你旋鈕應該向哪邊調。

2. Function：為何 y = f(x)？

Function 可以想成一部「輸入 → 按規則計算 → 輸出」的機器。

x → f → y    therefore    y = f(x)

例子 2.1｜最簡單 function

f(x) = 2x

Step 1｜x 是 input。

Step 2｜f 代表規則「乘 2」。

Step 3｜當 x=3，f(3)=2×3=6。

Step 4｜因此 output y=6。

答案  f(3)=6，亦即 y=6。

記法  x = input；f = 規則；f(x) = y = output。

3. Slope、Δ 與 Derivative

3.1 先由 y = 2x 看 slope

當 x 每增加 1，y 就增加 2。因此 slope = Δy/Δx = 2/1 = 2。

dy/dx = 2

可先讀成：「x 輕微改變時，y 的變化速度是 2。」

3.2 Δ（Delta）是什麼？

Δ 代表「改變量」。例如 x: 3→4，所以 Δx=1；y: 6→8，所以 Δy=2。

slope = Δy / Δx = 2 / 1 = 2

3.3 正式 derivative 定義

df(x)/dx = lim_(Δx→0) [ f(x+Δx) - f(x) ] / Δx

f(x+Δx)−f(x)：output 改變多少。

Δx：input 改變多少。

Δx→0：把步伐縮得極細，得到某一點的「瞬間斜率」。

初學者重點  目前不必背 limit 推導；先牢記 Derivative = slope = rate of change。

4. Minimum：為何 derivative = 0？

對 U 型函數，左邊向右走時在下降（derivative < 0），過了谷底之後開始上升（derivative > 0）。谷底那一刻的切線水平，所以 derivative = 0。

例子 4.1｜f(x)=x² 的 minimum

f(x)=x²,  f'(x)=2x

Step 1｜要找水平點，令 f'(x)=0。

Step 2｜2x=0，所以 x=0。

Step 3｜代回原 function：f(0)=0²=0。

答案  minimum = (0,0)。

重要修正  derivative = 0 表示 stationary point（平坦點），未必必然是 minimum；也可能是 maximum 或其他情況。這一章先用 U 型 loss 建立 intuition。

5. Loss Function 與 Squared Error

課件的簡單模型是 ŷ=b₀：模型無論見到哪個 observation，都輸出同一個 b₀。資料是 30,000、40,000、30,000。

L(b₀) = Σᵢ₌₁ⁿ (b₀ - yᵢ)²

看到的形式

Rule

公式

快速例子

L

Loss function

L(b₀)

總 prediction error

b₀

parameter / prediction

ŷ=b₀

模型固定預測值

yᵢ

truth

y₁,y₂,…

第 i 個真實答案

b₀−yᵢ

error

prediction−truth

預測與真實差距

Σ

sum

全部相加

把每筆 error 加總

L(b₀)=(b₀−30000)²+(b₀−40000)²+(b₀−30000)²

為何平方？  平方會把正負誤差都變成非負值，而且大錯誤會被懲罰得更重；對這個簡單例子，最優 b₀ 是三個 y 的平均值 33,333.33。

6. 七大 Derivative Rules

做 derivative 題目不是「猜答案」，而是先辨認式子的結構，再套對應規則。課件列出以下七條。

看到的形式

Rule

公式

快速例子

c（純常數）

Constant rule

d(c)/dx = 0

d(8)/dx=0

xⁿ

Power rule

d(xⁿ)/dx = n xⁿ⁻¹

d(x³)/dx=3x²

c·f(x)

Constant multiple

d(c f)/dx = c f'(x)

d(5x²)/dx=10x

f(x)+g(x)

Sum rule

(f+g)' = f'+g'

d(x²+3x)/dx=2x+3

g(f(x))

Chain rule

outer' × inner'

d((2x+1)²)/dx=4(2x+1)

eˣ

Exponential

d(eˣ)/dx=eˣ

d(3eˣ)/dx=3eˣ

log x

Logarithm

d(log x)/dx=1/x

d(log x+2)/dx=1/x

6.1 Constant Rule

d(c)/dx = 0

原因不是「因為 c=1」；而是 c 代表任何不隨 x 改變的固定數字。固定值的圖是一條水平線，所以 slope=0。

d(1)/dx = 0

d(8)/dx = 0

d(−7)/dx = 0

d(1000)/dx = 0

最常見混淆  d(1)/dx=0，但 d(x)/dx=1。1 是常數；x 是變數。

6.2 Power Rule

d(xⁿ)/dx = n xⁿ⁻¹

口訣：次方搬前面，指數減 1。

例子 6.2A

d(x³)/dx

Step 1｜x³ 的 n=3。

Step 2｜把 3 搬到前面：3x^(3−1)。

Step 3｜3−1=2。

答案  3x²

例子 6.2B｜為何 d(x)/dx=1？

d(x)/dx

Step 1｜x 可以寫成 x¹。

Step 2｜Power rule：1×x^(1−1)=x⁰。

Step 3｜任何非零 x 的 x⁰=1。

答案  1

6.3 Constant Multiple Rule

d(c f(x))/dx = c · f'(x)

例子 6.3A

d(5x²)/dx

Step 1｜5 是前面的 constant，先保留。

Step 2｜x² → 2x（Power rule）。

Step 3｜5×2x=10x。

答案  10x

例子 6.3B｜你問過的 3x

d(3x)/dx

Step 1｜3x=3·x。

Step 2｜3 照搬。

Step 3｜d(x)/dx=1。

Step 4｜3×1=3。

答案  3

例子 6.3C｜−z

d(−z)/dz

Step 1｜−z = −1·z。

Step 2｜−1 照搬。

Step 3｜d(z)/dz=1（變數對自己求導 = 1）。

Step 4｜−1×1=−1。

答案  −1

6.4 Sum Rule

d(f(x)+g(x))/dx = f'(x)+g'(x)

例子 6.4A

d(x²+3x+5)/dx

Step 1｜x² → 2x（Power）。

Step 2｜3x → 3（Constant multiple + d(x)/dx=1）。

Step 3｜5 → 0（Constant）。

Step 4｜全部加回：2x+3+0。

答案  2x+3

減法怎辦？  可以把減法視為「加上一個負項」。例如 d(x²−4x)/dx = 2x−4。

6.5 Chain Rule

d[g(f(x))]/dx = g'(f(x)) · f'(x)

口訣：外層求導 × 內層求導。

例子 6.5A｜(2x+1)²

d((2x+1)²)/dx

Step 1｜先看結構：外層是 (□)²；內層是 2x+1。

Step 2｜外層 derivative：2(2x+1)。

Step 3｜內層 derivative：d(2x+1)/dx = 2+0 = 2。這一步同時用了 Constant multiple + Constant + Sum。

Step 4｜Chain rule 相乘：2(2x+1)×2。

答案  4(2x+1) = 8x+4

例子 6.5B｜(x²+1)³

d((x²+1)³)/dx

Step 1｜外層 (□)³ → 3(□)²。

Step 2｜代回內層：3(x²+1)²。

Step 3｜內層 x²+1 → 2x+0 = 2x。

Step 4｜相乘：3(x²+1)²·2x。

答案  6x(x²+1)²

6.6 Exponential Rule

d(eˣ)/dx = eˣ

例子 6.6A

d(3eˣ)/dx

Step 1｜3 是 constant，照搬。

Step 2｜eˣ 求導後仍然是 eˣ。

答案  3eˣ

例子 6.6B｜需要 Chain Rule

d(e²ˣ)/dx

Step 1｜外層 e^(□) 求導仍是 e²ˣ。

Step 2｜內層 2x 的 derivative 是 2。

Step 3｜相乘。

答案  2e²ˣ

6.7 Logarithm Rule

d(log x)/dx = 1/x

例子 6.7A

d(log x + 2)/dx

Step 1｜log x → 1/x。

Step 2｜2 是 constant → 0。

Step 3｜Sum rule：1/x + 0。

答案  1/x

7. 如何判斷用哪條 Rule？

每次由「最外層結構」開始看，再逐層拆。以下是最實用的判斷順序。

順序

你問自己

主要 Rule

例子

1

純數字？

Constant

8 → 0

2

x 的次方？

Power

x⁴ → 4x³

3

前面有常數乘住？

Constant multiple

5x² → 5·2x

4

有加／減幾項？

Sum

x²+3x+5 逐項求導

5

function 裡包 function？

Chain

(2x+1)² 外×內

6

見到 e^(...)？

Exponential (+ Chain)

e²ˣ → e²ˣ·2

7

見到 log(...)？

Log (+ Chain)

log(3x) 需要內層 derivative

關鍵  一題可以同時用多條 rule。例如 d(2x+1)/dx：最外層有加法 → Sum；2x → Constant multiple；1 → Constant。

8. Chain Rule 超詳細拆解

Chain Rule 最容易卡住，因為它要求你把一個式子看成「外層 function 包住內層 function」。

Outer( Inner(x) )

例子 8.1｜(3x+1)²

d((3x+1)²)/dx

Step 1｜外層：u²。其 derivative 對 u 是 2u。

Step 2｜把 u 換回 3x+1 → 2(3x+1)。

Step 3｜內層：3x+1。其 derivative = 3+0=3。

Step 4｜外×內 = 2(3x+1)×3。

答案  6(3x+1)

例子 8.2｜e^(−z)

d(e^(−z))/dz

Step 1｜外層：e^u → derivative 仍是 e^u。

Step 2｜代回 u=−z → e^(−z)。

Step 3｜內層：−z = −1·z。

Step 4｜d(−z)/dz = −1·1 = −1。

Step 5｜外×內：e^(−z)×(−1)。

答案  −e^(−z)

你之前卡住的點  d(−z)/dz=−1，是因為 −z=−1·z，使用 Constant multiple rule；而 d(z)/dz=1。

9. Mixed Rules 綜合例子

以下題目刻意混合多條規則。真正做 ML calculus 時，這種混合才是常態。

Mixed A

d(5x² + 3x + 7)/dx

Step 1｜最外層是加法 → Sum rule。

Step 2｜5x² → 5·2x = 10x。

Step 3｜3x → 3·1 = 3。

Step 4｜7 → 0。

答案  10x+3

Mixed B

d((2x+1)² + eˣ)/dx

Step 1｜最外層加法 → 分兩部分。

Step 2｜(2x+1)²：Chain → 2(2x+1)·2 = 4(2x+1)。

Step 3｜eˣ → eˣ。

Step 4｜兩部分相加。

答案  4(2x+1)+eˣ

Mixed C

d(4x³ + log x + 2)/dx

Step 1｜4x³ → 4·3x² = 12x²。

Step 2｜log x → 1/x。

Step 3｜2 → 0。

Step 4｜全部相加。

答案  12x² + 1/x

Mixed D

d((x²+1)³)/dx

Step 1｜外層三次方 → 3(x²+1)²。

Step 2｜內層 x²+1 → 2x。

Step 3｜相乘。

答案  6x(x²+1)²

Mixed E｜Loss 常見形式

d((b₀−30000)²)/db₀

Step 1｜外層平方 → 2(b₀−30000)。

Step 2｜內層 b₀−30000：d(b₀)/db₀=1；常數 30000 → 0。

Step 3｜內層 derivative =1。

Step 4｜外×內。

答案  2(b₀−30000)

10. Sigmoid Derivative 完整推導

σ(z) = 1 / (1 + e^(−z))

Sigmoid 把任何實數 z 壓到 0 和 1 之間，常用於 logistic regression / binary classification。課件指出它的 derivative 有一個很方便的形式。

10.1 第一步：改寫成 power 形式

σ(z) = (1 + e^(−z))^(−1)

10.2 外層 derivative

外層是 u^(−1)。Power rule：u^(−1) → −u^(−2)。

−(1 + e^(−z))^(−2)

10.3 內層 derivative

內層 1+e^(−z)：1 是 constant → 0；e^(−z) 需要 Chain Rule。

d(e^(−z))/dz = e^(−z) · d(−z)/dz = −e^(−z)

10.4 外 × 內

−(1+e^(−z))^(−2) × (−e^(−z)) = e^(−z)/(1+e^(−z))²

10.5 整理成課件公式

1−σ(z) = e^(−z)/(1+e^(−z))

σ(z)(1−σ(z)) = e^(−z)/(1+e^(−z))²

最後結果  σ'(z) = σ(z)(1−σ(z))。例如 z=0：σ(0)=0.5，所以 σ'(0)=0.5×0.5=0.25。

11. Partial Derivative 與 Gradient

一個 variable 時用 derivative；多個 variables / parameters 時，就要分別看每一個方向的變化。

∇f = ( ∂f/∂x₁,  ∂f/∂x₂,  …,  ∂f/∂xₙ )ᵀ

∂ 的意思  partial derivative：當你對 x₁ 求導時，暫時把 x₂、x₃… 當作 constant。

例子 11.1｜兩個 variables

f(x₁,x₂)=x₁²+x₂²

Step 1｜對 x₁：x₁² → 2x₁；x₂² 對 x₁ 來說是 constant → 0。

Step 2｜所以 ∂f/∂x₁=2x₁。

Step 3｜同理 ∂f/∂x₂=2x₂。

Step 4｜把兩個 partial derivatives 放在一起，就是 gradient。

答案  ∇f=(2x₁, 2x₂)ᵀ

若目前 (x₁,x₂)=(3,2)，則 gradient=(6,4)ᵀ。意思是目前兩個方向的斜率分別是 6 和 4。

12. Gradient Descent 與 Learning Rate α

θₜ₊₁ = θₜ − α ∇f(θₜ)

看到的形式

Rule

公式

快速例子

θₜ

目前 parameters

current position

現在企在哪裡

∇f(θₜ)

gradient

slope / steepest ascent

目前上升最快方向

−

minus

反方向

我們想下降，不想上升

α

learning rate

step-size multiplier

控制更新有多 aggressive

θₜ₊₁

new parameters

next position

更新後的位置

12.1 α 不是「實際固定行 α」

actual step = α × gradient

例子 12.1｜f(x)=x²

x₀=3,  f'(x)=2x,  α=0.1

Step 1｜在 x=3，gradient=2×3=6。

Step 2｜實際步幅 = 0.1×6 = 0.6。

Step 3｜新位置 x₁=3−0.6=2.4。

Step 4｜下一步 gradient=2×2.4=4.8。

Step 5｜新位置 x₂=2.4−0.1×4.8=1.92。

答案  3 → 2.4 → 1.92 → … → 0

α 太細  每一步很細，收斂慢。

α 太大  可能一步跨過谷底，甚至來回震盪或發散。

13. 從 Loss 到最優 b₀：完整 ML 例子

L(b₀)=(b₀−30000)²+(b₀−40000)²+(b₀−30000)²

現在把你學過的 Sum + Chain + Constant rules 全部用一次。

dL/db₀ = 2(b₀−30000)+2(b₀−40000)+2(b₀−30000)

找 U 型 Loss 的 stationary point，令 derivative=0：

2(b₀−30000)+2(b₀−40000)+2(b₀−30000)=0

兩邊除以 2：

(b₀−30000)+(b₀−40000)+(b₀−30000)=0

合併同類項：

3b₀−100000=0  →  3b₀=100000  →  b₀=33333.33

結論  這就是為什麼 squared-error constant model 的最優 b₀ 是平均數；不是「背答案」，而是 calculus 推導出來。

14. 常見混淆與 FAQ

Q1｜d(1)/dx 為何是 0，但 d(x)/dx 是 1？  1 是固定常數，不隨 x 改；x 是變數本身，x 每增加 1，x 自己也增加 1。

Q2｜d(3x)/dx 為何是 3？  3x=3·x；3 照搬，而 d(x)/dx=1，所以 3×1=3。

Q3｜d(−z)/dz 為何是 −1？  −z=−1·z；−1 照搬，而 d(z)/dz=1。

Q4｜5x² 為何變 10x？  x² → 2x，再乘原本常數 5，所以 5×2x=10x。

Q5｜(2x+1)² 為何要多乘一個 2？  因為它是「外層平方」包住「內層 2x+1」。外層 derivative 得 2(2x+1)，內層 derivative 又是 2，所以要相乘。

Q6｜f(3)=9 和 f'(3)=6 有什麼不同？  若 f(x)=x²，f(3)=9 是曲線在 x=3 的高度；f'(3)=6 是該位置的斜率。

Q7｜Derivative = 0 就一定是 minimum？  不一定。它只保證是 stationary point；要看曲線形狀或其他判斷。

Q8｜Learning rate α=0.1 是否代表每次行 0.1？  不是。實際 update 大小是 α×gradient。gradient 大時步幅較大，gradient 小時步幅較小。

15. 練習題＋答案

先遮住答案自己做。每題先講「用了什麼 rule」，再計 derivative。

題

題目

答案

主要 Rule

1

d(9)/dx

0

Constant

2

d(x⁴)/dx

4x³

Power

3

d(6x)/dx

6

Constant multiple

4

d(4x³)/dx

12x²

Constant multiple + Power

5

d(x²+7x+2)/dx

2x+7

Sum + Power + Constant multiple + Constant

6

d((3x+2)²)/dx

6(3x+2)

Chain

7

d(e^(4x))/dx

4e^(4x)

Exponential + Chain

8

d((x²+5)³)/dx

6x(x²+5)²

Chain + Power

9

d(2x²+eˣ+5)/dx

4x+eˣ

Sum + Power + Exponential + Constant

10

d((b−10)²)/db

2(b−10)

Chain + Constant

16. 最後 Cheat Sheet

Derivative = slope = rate of change

看到的形式

Rule

公式

快速例子

常數 c

Constant

d(c)/dx=0

8→0

x

Power n=1

d(x)/dx=1

x→1

xⁿ

Power

n xⁿ⁻¹

x³→3x²

c·xⁿ

Multiple + Power

c·n xⁿ⁻¹

5x²→10x

加／減

Sum

逐項求導

x²+3x+5→2x+3

包一層

Chain

外'×內'

(2x+1)²→4(2x+1)

eˣ

Exponential

eˣ

e²ˣ→2e²ˣ

log x

Log

1/x

log x+2→1/x

Gradient = 多個 partial derivatives 放在一起

Gradient Descent:  θ_new = θ_old − α × gradient

actual step size = α × gradient

整章只講一件事  利用 derivative / gradient 告訴模型「參數改哪個方向會令 Loss 下降」，再用 learning rate 控制每一步的幅度，反覆更新直到接近 minimum。

資料來源與範圍

主要依據：University of Colorado Boulder, “Mathematical Foundations for Machine Learning”, Calculus and Optimization 部分（Learning as Optimization、Derivatives and Optimization、Common Derivation Rules、Gradient Descent、Sigmoid Function Derivative），並加入本次對話中為初學者補充的逐步例子與常見混淆說明。

## Connections

[[Supervised Learning MOC]] · [[Supervised Learning - Module 1 MOC]] · [[Machine Learning Introduction]] · [[Mathematical Foundations for Machine Learning Linear Algebra]]

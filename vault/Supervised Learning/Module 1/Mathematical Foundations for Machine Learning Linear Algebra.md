---
course: Supervised Learning
module: 1
status: curated
tags:
  - supervised
  - module-1
  - linear-algebra
  - mathematics
publish: true
---

# Mathematical Foundations for Machine Learning Linear Algebra

> [!info] Learning position
> Supervised Learning → Module 1 → Topic 4

## ML_Calculus_完整白紙版_含6張卡牌

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

15. 六張必懂卡牌

16. 本次學習過程 Q&A

17. 練習題＋答案

18. 最後 Cheat Sheet

19. 資料來源與範圍

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

10. Sigmoid Derivative：由第一條公式到第二條公式，完全不跳步

σ(z) = 1 / (1 + e^(−z))

這一節專門回答：為什麼上面的 Sigmoid function，求 derivative 後會變成 σ'(z)=σ(z)(1−σ(z))？以下從符號開始，每一步都寫出所用規則。

10.0 先認清符號

σ（sigma）：只是這個 function 的名字，好像 f 一樣。

z：input variable，好像之前的 x。

σ(z)：把 z 放入 Sigmoid 後的 output。

dσ(z)/dz：z 改一點點時，Sigmoid output 改變得有多快，也就是 slope。

先不要急著推導  先記：z → Sigmoid → σ(z)，就像 x → f → f(x)=y。

10.1 Step 1-3：先把分數改成負次方

Step 1｜原式：

σ(z)=1/(1+e^(−z))

Step 2｜使用純代數規則 1/a = a^(−1)。這一步還沒有求 derivative。

1/(1+e^(−z)) = (1+e^(−z))^(−1)

Step 3｜現在可以看到「外層」和「內層」：外層是 (□)^(−1)，內層是 1+e^(−z)。所以接下來要用 Chain Rule。

10.2 Step 4-6：先求最外層 derivative

Step 4｜把內層暫時叫做 u：u = 1+e^(−z)。原式暫時變成 u^(−1)。

Step 5｜Power Rule：d(u^n)/du = n u^(n−1)。這裡 n=−1。

u^(−1) → (−1)u^(−2) = −u^(−2)

Step 6｜把 u 換回 1+e^(−z)：

outer derivative = −(1+e^(−z))^(−2)

重要  到這裡仍未完成，因為 Chain Rule 還要求「外層 derivative × 內層 derivative」。

10.3 Step 7-12：求內層 1+e^(−z) 的 derivative

Step 7｜內層是兩項相加：1 + e^(−z)，所以先用 Sum Rule 拆開。

d(1+e^(−z))/dz = d(1)/dz + d(e^(−z))/dz

Step 8｜第一項 1 是純常數，因此用 Constant Rule。不是因為它剛好是 1，而是因為它完全不隨 z 改變。

d(1)/dz = 0

Step 9｜第二項 e^(−z) 裡面又有一層 −z，因此再次使用 Chain Rule。

Step 10｜e^u 的 derivative 仍然是 e^u，所以外層先得到 e^(−z)。

Step 11｜再求內層 −z。因為 −z = −1·z，使用 Constant Multiple Rule；而 d(z)/dz=1。

d(−z)/dz = −1·d(z)/dz = −1·1 = −1

Step 12｜所以：

d(e^(−z))/dz = e^(−z)·(−1) = −e^(−z)

10.4 Step 13-15：把內層合回去，再做最外層 Chain Rule

Step 13｜內層 derivative = 0 + (−e^(−z))。

d(1+e^(−z))/dz = −e^(−z)

Step 14｜最外層 Chain Rule：外層 derivative × 內層 derivative。

dσ/dz = [−(1+e^(−z))^(−2)] × [−e^(−z)]

Step 15｜負 × 負 = 正；再把負次方改回分數。

dσ/dz = e^(−z)(1+e^(−z))^(−2) = e^(−z)/(1+e^(−z))²

到這裡 derivative 已經算完  後面只是把答案改寫成課件比較漂亮、計算更方便的 σ(z)(1−σ(z)) 形式。

10.5 Step 16-20：為什麼可以寫成 σ(z)(1−σ(z))？

Step 16｜記住原本定義：

σ(z)=1/(1+e^(−z))

Step 17｜計算 1−σ(z)：

1−σ(z) = 1 − 1/(1+e^(−z))

Step 18｜要減分數，先通分。把 1 寫成 (1+e^(−z))/(1+e^(−z))。

1−σ(z) = (1+e^(−z))/(1+e^(−z)) − 1/(1+e^(−z)) = e^(−z)/(1+e^(−z))

Step 19｜將 σ(z) 與 1−σ(z) 相乘：

σ(z)(1−σ(z)) = [1/(1+e^(−z))]·[e^(−z)/(1+e^(−z))]

Step 20｜分子乘分子、分母乘分母：

σ(z)(1−σ(z)) = e^(−z)/(1+e^(−z))² = dσ(z)/dz

最後結果  dσ(z)/dz = σ(z)(1−σ(z))。這條推導實際同時用了 Power、Chain、Sum、Constant、Exponential、Constant Multiple 六種觀念。

10.6 數值例子：z=0

σ(0)=1/(1+e⁰)=1/2=0.5

σ'(0)=σ(0)(1−σ(0))=0.5×0.5=0.25

意思：在 z=0 附近，Sigmoid 的瞬間斜率是 0.25。

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

15. 六張必懂卡牌：由最簡單到 Chain Rule

這 6 張卡牌就是之前反覆問到的核心題。每張都可以獨立閱讀：先判斷式子長什麼樣，再選 Rule，再逐步計。

CARD 1  |  純常數：為什麼答案是 0？

d(8)/dx

① 先判斷：8 完全沒有 x，是固定數字。

② 用哪條 Rule：Constant Rule：d(c)/dx=0

Step 1｜把 8 看成 constant c。

Step 2｜constant 不會因 x 改變，所以 y 的改變量 Δy=0。

Step 3｜因此 slope / derivative = 0。

答案：0

直覺：圖像是一條水平線；x 怎樣走，y 都停在 8。

CARD 2  |  變數對自己求導：為什麼是 1？

d(x)/dx

① 先判斷：x 是變數本身，不是純數字。

② 用哪條 Rule：Power Rule（n=1）：x=x¹

Step 1｜x 可以寫成 x¹。

Step 2｜Power Rule：1·x^(1−1)=x⁰。

Step 3｜x⁰=1，所以答案是 1。

答案：1

直覺：若 y=x，x 每 +1，y 也 +1，所以 slope=1。

CARD 3  |  Power Rule：x² 怎樣變 2x？

d(x²)/dx

① 先判斷：看到 x 的次方。

② 用哪條 Rule：Power Rule：d(xⁿ)/dx=n x^(n−1)

Step 1｜n=2。

Step 2｜把 2 搬到前面。

Step 3｜指數 2−1=1。

Step 4｜得到 2x¹=2x。

答案：2x

直覺：例如 x=3 時，f(3)=9 是高度；f'(3)=6 才是斜率。

CARD 4  |  常數乘次方：5x²

d(5x²)/dx

① 先判斷：前面有 5，後面有 x²。

② 用哪條 Rule：Constant Multiple + Power Rule

Step 1｜5 是 constant，先原封不動保留。

Step 2｜x² → 2x。

Step 3｜5×2x = 10x。

答案：10x

直覺：你之前問「2×5=10？」答案是對，但不要漏掉剩下的 x，所以是 10x。

CARD 5  |  多項相加：x²+3x+5

d(x²+3x+5)/dx

① 先判斷：最外層是三項相加。

② 用哪條 Rule：Sum + Power + Constant Multiple + Constant

Step 1｜Sum Rule：逐項求 derivative。

Step 2｜x² → 2x。

Step 3｜3x = 3·x → 3·1 = 3。

Step 4｜5 是 constant → 0。

Step 5｜重新相加：2x+3+0。

答案：2x+3

直覺：一題可以同時使用多條 Rule；Rule 是按每一層／每一項的結構選擇。

CARD 6  |  裡外兩層：(2x+1)²

d((2x+1)²)/dx

① 先判斷：看到平方外面包住 2x+1，明顯有外層和內層。

② 用哪條 Rule：Chain Rule + Sum + Constant Multiple + Constant

Step 1｜外層 (□)² → 2(□)，所以得到 2(2x+1)。

Step 2｜內層 2x+1：2x → 2；1 → 0，所以內層 derivative=2。

Step 3｜Chain Rule：外層 derivative × 內層 derivative。

Step 4｜2(2x+1)×2 = 4(2x+1)。

Step 5｜若展開，就是 8x+4。

答案：4(2x+1)=8x+4

直覺：Chain Rule 的「多乘一個 2」來自內層 2x+1 的 derivative。

16. 本次學習過程 Q&A：把你問過的問題逐個釐清

Q1｜y=2x 為什麼會說 x+1 ⇒ y+2？  因為當 x 增加 1，例如 1→2，y 由 2→4，增加 2。這不是說公式變成 y+2，而是在描述變化量。

Q2｜如果 x+1 ⇒ y+10，是否 dy/dx=10？  若這個關係在所討論位置成立，斜率就是 Δy/Δx=10/1=10。對直線 y=10x 或 y=10x+5，derivative 都是 10。

Q3｜y=x² 為什麼圖要畫成 U 型？  代 x=−2,−1,0,1,2，得到 y=4,1,0,1,4，所以左右對稱、最低點在 (0,0)，自然形成 U 型。

Q4｜d(x³)/dx 是否等於 3x²？  是。Power Rule：把 3 搬到前面，指數由 3 減到 2。

Q5｜d(3x)/dx 為什麼是 3？  3x=3·x；3 照搬，而 d(x)/dx=1，所以 3×1=3。

Q6｜d(−z)/dz 怎樣判斷？  −z=−1·z；−1 是常數照搬，而 d(z)/dz=1，所以 −1×1=−1。

Q7｜為什麼 d(z)/dz=1？  z=z¹；Power Rule 得 1·z⁰=1。亦可從 slope 看：z 自己每 +1，自己也 +1。

Q8｜d(5x²)/dx 是不是因為 2×5=10？  對，但完整過程是 5 保留、x²→2x，所以 5×2x=10x；不能漏掉 x。

Q9｜d(2x+1)/dx 同時用了 Constant Multiple Rule 和 Constant Rule？  對，而且最外層還用了 Sum Rule：2x→2（Constant Multiple），1→0（Constant），最後 2+0=2。

Q10｜(2x+1)² 為什麼不是只得到 2(2x+1)？  因為還沒做內層 derivative。Chain Rule 要外×內；內層 2x+1 的 derivative 是 2，因此再乘 2。

Q11｜Constant Rule 是否因為那個數剛好是 1？  不是。任何純常數的 derivative 都是 0：1、5、−7、100 都一樣。

Q12｜Learning rate α=0.1 是否代表每次固定行 0.1？  不是。實際步幅是 α×gradient。例如 gradient=6 時，步幅是 0.1×6=0.6。

Q13｜f(3)=9 與 f'(3)=6 有什麼分別？  若 f(x)=x²，f(3)=9 是函數高度／output；f'(3)=6 是 x=3 那一點的斜率。

Q14｜Derivative=0 是否一定是 minimum？  不一定。Derivative=0 只表示 stationary point；在 U 型例子中是 minimum，但其他函數可能是 maximum 或其他平坦點。

17. 練習題＋答案

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

18. 最後 Cheat Sheet

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

19. 資料來源與範圍

主要依據：University of Colorado Boulder, “Mathematical Foundations for Machine Learning”, Calculus and Optimization 部分（Learning as Optimization、Derivatives and Optimization、Common Derivation Rules、Gradient Descent、Sigmoid Function Derivative），並加入本次對話中為初學者補充的逐步例子與常見混淆說明。

## Linear_Algebra_ML_深入淺出筆記

Linear Algebra for Machine Learning深入淺出完整筆記

由 Scalar、Vector、Matrix，到 Matrix Multiplication 與 y = Xb

整理基礎：University of Colorado Boulder — Mathematical Foundations for Machine Learning（Linear Algebra Review）

使用方法：先理解「人話版」，再看正式 notation。遇到公式時，永遠先問：每個符號代表哪一行、哪一列、哪個位置？

本筆記學習目標

分清 Scalar、Vector、Matrix，以及它們在 Machine Learning 中代表甚麼。

熟悉 row（行、橫）與 column（列、直），以及 aᵢⱼ / xᵢⱼ 的讀法。

理解 matrix multiplication 的 dimension 規則、i / j / z 的角色，以及正式求和 notation。

掌握 identity matrix、inverse、transpose 等基本性質。

看懂 ℝ、ℝⁿ、ℝʳˣˢ，以及 ML 常見 X、y、x、b notation。

理解 linear model 為甚麼可以寫成 y = Xb。

目錄

章

內容

章

內容

1

Scalar：一粒數

7

Matrix Multiplication 深入拆解

2

Vector：一組有次序的數

8

Special Matrices and Properties

3

Matrix：像 Excel 的數字資料表

9

Dimensions and Notation

4

Matrix notation：xᵢⱼ、row、column

10

Machine Learning 常見符號

5

Rows / Columns 與 Transpose

11

Linear Models as Matrix Operations

6

Matrix Operations

12

考試速記與練習

1. Scalar：一粒數

Scalar 的本質就是「單一 numerical value」。它可以是整數、小數、負數，甚至很細的科學記號數字。

例： 5、−3、0.1、10⁻¹⁰ 都是 scalar

最簡單記法：Scalar = 一粒數。

數學常用希臘字母 α、β、γ、θ 等表示 scalar；普通英文字母也可以。它們只是變數名稱，不是額外運算。

α = 0.1   ⇔   可以把它想成 Python：alpha = 0.1

在 Machine Learning 中，一個 scalar 可以代表 weight、parameter、hyperparameter、regularization parameter 等。

2. Vector：一組有次序的數

Vector 是多個 scalar 按次序放在一起。這份課程預設 vector 寫成 column vector（直向）。

10

20

30

一條長度 3 的 column vector

x = [10, 20, 30]ᵀ   →   x₁ = 10，x₂ = 20，x₃ = 30

重點：整條 x 是 vector；x₁、x₂、x₃ 每一個單獨值都是 scalar。

Dimension 對 vector 而言，可以先理解為「有幾多個元素」。

[10, 20, 30]ᵀ 有 3 個元素 → 3-dimensional vector

在 ML 中，每個位置通常可以是一個 feature。例如一筆交易可用 Amount、Tx count、Risk score 等數字組成一條 feature vector。

位置

可能代表的 feature

x₁

Amount

x₂

24h Tx count

x₃

Risk score

3. Matrix：像 Excel 的數字資料表

Matrix 可以理解成 Excel / DataFrame 內由 rows 和 columns 組成的數字資料表。它完全不限制在 3×3；實際 ML matrix 可以是 1000×50、100000×30，甚至更大。

Size

意思

2×4

2 rows × 4 columns

1000×50

1000 observations × 50 features

100000×30

100000 transactions × 30 features

口訣：Matrix size 永遠寫成 Rows × Columns（先行，後列）。

Machine Learning 常用 rows 表示 observations / samples，columns 表示 features / variables。

觀察角度

例子

Row（行，橫）

一間屋 / 一個客戶 / 一筆 transaction 的全部 features

Column（列，直）

所有 observations 的同一個 feature，例如 Amount 或 Risk score

4. Matrix Notation：xᵢⱼ、row、column

對一個 matrix X，元素 xᵢⱼ 表示「第 i 個 row、第 j 個 column 的那一格」。

必背：xᵢⱼ：第一個 index i = row；第二個 index j = column。先 row，後 column。

1000

2

10

1500

3

5

2000

4

2

例：3 間屋 × 3 個 features

符號

值 / 意思

x₁₁

1000：第1行第1列

x₁₂

2：第1行第2列

x₂₁

1500：第2行第1列

x₂₃

5：第2行第3列

課件的句子「Each element xᵢⱼ is the value of feature j for observation i」可直接翻譯成：

人話版：xᵢⱼ = 第 i 個樣本的第 j 個 feature 數值。

5. Rows / Columns 與 Transpose

Row representation：一整行通常是一個 observation / sample 的全部 features。Column representation：一整列通常是同一個 feature 在所有 observations 的值。

結構

理解

Row

看「一個 object 的所有 features」

Column

看「一個 feature 在所有 objects 的值」

Transpose（轉置）用上標 T 表示。它做的事情非常直接：rows ↔ columns。

1

2

3

4

5

6

A：2×3

Aᵀ = [[1,4],[2,5],[3,6]]   →   3×2

記法：2×3 matrix transpose 後會變成 3×2。

6. Matrix Operations

這部分有四種基本操作：scalar multiplication、matrix addition、matrix multiplication、matrix transposition。

6.1 Scalar multiplication

αA = (α × aᵢⱼ)ᵢⱼ

人話：一粒 scalar 乘一個 matrix，就是 matrix 每一格都乘同一個數。

1

2

3

4

A

2A = [[2,4],[6,8]]

6.2 Matrix addition

Matrix addition 是 element-wise addition：同位置加同位置。兩個 matrices 的 size 必須相同，才可以逐格對應。

[[1,2],[3,4]] + [[10,20],[30,40]] = [[11,22],[33,44]]

條件：2×3 可以加 2×3；2×3 不可以直接加 3×2。

7. Matrix Multiplication 深入拆解

這是整個 Linear Algebra 基礎中最值得真正理解的部分。核心不是死背公式，而是「左邊 row × 右邊 column，對位相乘，再全部加埋」。

最核心一句：每一格 = A 對應 row 與 B 對應 column 做 dot product。

7.1 Dimension 規則：中間要一樣，答案看外面

(m × n)(n × p) → m × p

中間兩個 n 用來判斷「可不可以乘」；外面的 m 和 p 決定結果 matrix 的 size。

(2×3)(3×2) → 2×2

原因：A 有 2 rows，B 有 2 columns，所以結果 C = AB 有 2 rows × 2 columns。

口訣：中間決定可不可以乘；外面決定答案幾大。

7.2 正式 notation：i、j、z 分別做甚麼？

(AB)ᵢⱼ = Σᶻ aᵢ𝓏 b𝓏ⱼ

符號

人話

i

揀 A 的第幾 row；亦代表結果的第幾 row

j

揀 B 的第幾 column；亦代表結果的第幾 column

z

row 與 column 配對時，現在走到第幾個位置

Σ

把所有配對乘積全部加起來

如果中間 dimension = 3，z 不是「只等於 3」，而是會依次走過 3 個位置：

z = 1, 2, 3

(AB)ᵢⱼ = Σᶻ₌₁³ aᵢ𝓏 b𝓏ⱼ = aᵢ₁b₁ⱼ + aᵢ₂b₂ⱼ + aᵢ₃b₃ⱼ

最準確理解：中間 dimension = 3 → 每次 dot product 有 3 組數要配對 → z 走 1、2、3。

7.3 完整數字例子

以下沿用整份筆記最重要的例子：

1

2

3

4

5

6

A = 2×3

10

20

30

40

50

60

B = 3×2

A = 2×3，B = 3×2 → (2×3)(3×2) → C = AB = 2×2

因此 C 會有四格：c₁₁、c₁₂、c₂₁、c₂₂。我們每格都用「正式公式 → 展開 → 代數字 → 精簡心法」計。

第一格 c₁₁

c₁₁ = Σᶻ₌₁³ a₁𝓏 b𝓏₁

= a₁₁b₁₁ + a₁₂b₂₁ + a₁₃b₃₁

= 1×10 + 2×30 + 3×50 = 220

精簡：A 第1行 [1,2,3] × B 第1列 [10,30,50] → 220

第二格 c₁₂

c₁₂ = Σᶻ₌₁³ a₁𝓏 b𝓏₂ = 1×20 + 2×40 + 3×60 = 280

精簡：A 第1行 × B 第2列 → 280

第三格 c₂₁

c₂₁ = Σᶻ₌₁³ a₂𝓏 b𝓏₁ = 4×10 + 5×30 + 6×50 = 490

精簡：A 第2行 × B 第1列 → 490

第四格 c₂₂

c₂₂ = Σᶻ₌₁³ a₂𝓏 b𝓏₂ = 4×20 + 5×40 + 6×60 = 640

精簡：A 第2行 × B 第2列 → 640

AB = [[220, 280], [490, 640]]

7.4 z 到底是甚麼：用「位置」理解

計 c₁₁ 時，我們把 A 第1行 [1,2,3] 與 B 第1列 [10,30,50] 配對：

z

配對

z=1

1 × 10

z=2

2 × 30

z=3

3 × 50

Σ = 1×10 + 2×30 + 3×50 = 220

一句記住：i 揀行；j 揀列；z 數配對位置；Σ 全部加。

7.5 Excel / SUMPRODUCT 直覺

如果一筆 transaction 的 row 是 [Amount, Count, Risk]，而 weights 是一條 column vector，matrix multiplication 就像 Excel 的 SUMPRODUCT：對位相乘，再全部加起來。

Feature

數值 / Weight

Amount

10000 / 0.001

Count

5 / 2

Risk

0.8 / 10

10000×0.001 + 5×2 + 0.8×10 = 10 + 10 + 8 = 28

若有三筆 transaction，就會得到三個 scores，例如 [28, 27, 30]ᵀ，因此結果 dimension 是 3×1。

(3×3)(3×1) → 3×1

8. Special Matrices and Properties

8.1 Identity matrix：I

Identity matrix 可以理解成「matrix 世界的 1」。它是 square matrix，主對角線全是 1，其餘是 0。

1

0

0

0

1

0

0

0

1

3×3 identity matrix I

AI = IA = A

理解：普通數字 5×1 = 5；matrix 世界 A×I = A。

8.2 Matrix inverse：A⁻¹

AA⁻¹ = A⁻¹A = I

可以把 A⁻¹ 想成 A 的「反操作」，類似普通數字的 reciprocal（倒數）概念。注意：A⁻¹ 不是把每一格簡單做 1/a；而且不是所有 matrix 都有 inverse。

8.3 Addition 可交換；multiplication 通常不可交換

A + B = B + A

AB ≠ BA   （一般情況）

Matrix multiplication 有方向，因為 AB 是「A 的 rows × B 的 columns」，BA 是另一種配對。甚至兩者的結果 size 可能不同。

A: 2×3，B: 3×2 → AB: 2×2；BA: 3×3

8.4 Transpose of a product

(AB)ᵀ = BᵀAᵀ

Transpose 一串乘法時，不只每個 matrix 都 transpose，次序也要反轉。

A: 2×3，B: 3×4 → AB: 2×4 → (AB)ᵀ: 4×2

Bᵀ: 4×3，Aᵀ: 3×2 → BᵀAᵀ: 4×2

口訣：Transpose 成串乘法：逐個 T，再倒轉次序。

9. Dimensions and Notation

這一頁是在教你「看到符號就知道物件是 scalar、vector 還是 matrix，以及有多大」。

Notation

意思

a ∈ ℝ

a 是一個 real number（scalar）

a ∈ ℝⁿ

a 是長度 n 的 vector

A ∈ ℝʳˣˢ

A 是 r rows × s columns 的 matrix

符號 ∈ 可讀成「屬於」；ℝ 代表 real numbers（實數）。

a = −2.3 → a ∈ ℝ

a = [10,20,30]ᵀ → a ∈ ℝ³

A = [[1,2,3],[4,5,6]] → A ∈ ℝ²ˣ³

不要誤會：ℝ²ˣ³ 在這裡表示 2×3 real-valued matrix 的空間，不是在叫你把 2×3 當普通次方去算。

10. Machine Learning 常見符號

課件採用一套常見 notation convention。這是慣例，不是宇宙硬規則，但在這份課程中非常有用。

寫法

常見意思

粗體大寫 X

Matrix；通常是整個 feature dataset

粗體細寫 y

Vector；通常是 target / labels / predictions

普通細寫 x

視 context 可表示 scalar，或其他 vector

最實用的三層直覺：

X  →  xᵢ  →  xᵢⱼ

層級

人話

X

成張 Excel / 成個 dataset

xᵢ

第 i 筆 observation / sample

xᵢⱼ

第 i 筆資料的第 j 個 feature；某一格

例如 1000 筆 transactions × 8 個 features：

X ∈ ℝ¹⁰⁰⁰ˣ⁸

若每筆 transaction 都有一個 label，則：

y ∈ ℝ¹⁰⁰⁰

11. Linear Models as Matrix Operations

這一節把前面的 matrix multiplication 真正接到 Machine Learning。核心只有一句：

y = Xb

人話版：每一筆資料的 features × 各自的 weight，對位相乘再加起來，就得到 prediction。

11.1 先看一筆資料的 linear model

y = b₀ + Σⱼ₌₁ᵖ bⱼxⱼ

拆開就是：prediction = baseline + feature₁×weight₁ + feature₂×weight₂ + …

屋價例子：baseline = 50,000；每 sqft × 200；每 bedroom × 10,000。

y = 50,000 + 200×Size + 10,000×Bedrooms

Size=1000，Bedrooms=3 → y = 50,000 + 200,000 + 30,000 = 280,000

其中 b₀ 是 intercept / bias，可理解成 baseline；b₁、b₂… 是 coefficients / weights，代表每個 feature 對 prediction 的影響。

11.2 為甚麼要寫成 matrix form？

只有一間屋時可以逐條公式算；但有 1000 或 100000 個 observations 時，最好把全部 features 放入 X，用同一組 weights b 一次過做 matrix multiplication。

y = Xb

11.3 X 為甚麼要加一列 1？

因為 intercept b₀ 也想放進同一次 matrix multiplication。把普通公式改寫：

b₀ + b₁x₁ + b₂x₂  =  1×b₀ + x₁b₁ + x₂b₂

所以每個 observation 前面加一個 1。

1

1000

2

1

1500

3

1

2000

4

X：第一 column 的 1 專門對應 b₀

50000

200

10000

b = [b₀, b₁, b₂]ᵀ

(3×3)(3×1) → y: 3×1

逐行計：

House 1: 1×50000 + 1000×200 + 2×10000 = 270000

House 2: 1×50000 + 1500×200 + 3×10000 = 380000

House 3: 1×50000 + 2000×200 + 4×10000 = 490000

y = [270000, 380000, 490000]ᵀ

關鍵連結：你之前學的 row × column → 對位乘 → Σ 加埋，就是 linear model 一次過對多筆資料做 prediction 的核心。

12. 考試速記與練習

12.1 最值得背的口訣

主題

口訣

Row / Column

Row = 行 = 橫；Column = 列 = 直

aᵢⱼ

先 row，後 column

Matrix size

Rows × Columns

Matrix multiplication

中間要一樣；答案看外面

每一格怎樣算

左 row × 右 column；對位乘，再加埋

i / j / z

i 揀行；j 揀列；z 數配對位置

Transpose

rows ↔ columns

Identity

I = matrix 世界的 1

Inverse

AA⁻¹ = I

Product transpose

(AB)ᵀ = BᵀAᵀ

12.2 考試正式寫法 vs 快速算法

若題目只是叫你 calculate matrix multiplication，可以直接寫數字運算，清楚展示 row × column 即可。

[1,2,3] · [10,30,50]ᵀ = 1×10 + 2×30 + 3×50 = 220

若題目問「write the formula for the (i,j)-th entry of AB」，就應寫正式 notation：

(AB)ᵢⱼ = Σᶻ aᵢ𝓏b𝓏ⱼ

若中間 dimension 明確是 3，可以寫：

(AB)ᵢⱼ = Σᶻ₌₁³ aᵢ𝓏b𝓏ⱼ = aᵢ₁b₁ⱼ + aᵢ₂b₂ⱼ + aᵢ₃b₃ⱼ

12.3 小練習

1. 一個 matrix 有 4 rows、7 columns，它的 size 是甚麼？

2. A 是 2×3，B 是 3×5。AB 可以相乘嗎？結果 size 是甚麼？

3. A 是 2×3，B 是 4×2。AB 可以相乘嗎？為甚麼？

4. 若中間 dimension = 4，z 會走哪些值？

5. 在 a₂₃ 中，2 和 3 分別代表甚麼？

6. 計 [1,2,3] · [4,5,6]ᵀ。

7. 若 A 是 2×3，Aᵀ 是甚麼 size？

8. 寫出 3×3 identity matrix。

9. 解釋為甚麼 AB 一般不等於 BA。

10. 在 y = Xb 中，X、b、y 分別代表甚麼？

12.4 參考答案

1. 4×7。

2. 可以；(2×3)(3×5) → 2×5。

3. 不可以；中間 3 ≠ 4。

4. z = 1,2,3,4。

5. 2 = 第2 row；3 = 第3 column。

6. 1×4 + 2×5 + 3×6 = 32。

7. 3×2。

8. [[1,0,0],[0,1,0],[0,0,1]]。

9. 因為 AB 與 BA 的 row/column 配對方向不同，dimension 甚至可能不同。

10. X = feature matrix；b = coefficients / weights vector；y = predictions vector。

最後總結

一條主線：Scalar 是一粒數 → Vector 是一組有次序的 scalar → Matrix 是多個 rows / columns 組成的數字資料表 → Matrix multiplication 將 rows 與 columns 做 dot product → ML 用 y = Xb 把大量 observations 一次過轉成 predictions。

你不需要把所有符號一次背熟。最重要是每次看到公式，都能把它還原成「哪一行、哪一列、哪個位置、做甚麼運算」。當這個直覺建立起來，後面的 calculus、gradient descent、regression 會容易很多。

來源註記：本筆記主要整理自 University of Colorado Boulder 的 “Mathematical Foundations for Machine Learning” 參考課件中 Linear Algebra Review 的 scalars, vectors, matrices, matrix operations, special matrices, dimensions/notation 與 linear models 內容；例子與中文白話說明為教學整理。

## Connections

[[Supervised Learning MOC]] · [[Supervised Learning - Module 1 MOC]] · [[Mathematical Foundations for Machine Learning Calculus]] · [[Mathematical Foundations for Machine Learning Probability]]

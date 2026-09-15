---
course: Supervised Learning
module: 2
status: curated
tags:
  - supervised
  - module-2
  - machine-learning
publish: true
---

# Deriving the Least Squares Solution

> [!info] Learning position
> Supervised Learning → Module 2 → Topic 1

## Deriving_Least_Squares_Complete_Page_by_Page_Notes_TC

# Deriving the Least Squares Solution
## 21 頁逐頁分析＋淺白詳細完整筆記

**課程**：Supervised Learning — Machine Learning, University of Colorado Boulder  
**教材**：*Deriving the Least Squares Solution*  
**重點範圍**：Simple Linear Regression、Sum of Squared Errors、Loss Function、Partial Derivatives、Normal Equations、Matrix Notation、Closed-form OLS Solution、Geometric Interpretation、Multiple Linear Regression  

> 這份筆記以教材 PDF 的 21 頁順序為主軸，逐頁分析「這一頁在做什麼、公式怎樣來、為什麼要做、與上一頁/下一頁如何連接」。影片中的口頭補充只用來幫助理解，不會取代教材本身的內容。

---

# 目錄

- 0. 先看全課的大方向
- PDF Page 1 — Title: Deriving the Least Squares Solution
- PDF Page 2 — Ordinary Least Squares: Mathematical Derivation
- PDF Page 3 — The Least Squares Problem
- PDF Page 4 — Step 1: Define the Loss Function
- PDF Page 5 — Step 2: Find Critical Points by Taking Partial Derivatives
- PDF Page 6 — Step 3: Calculate the Gradients
- PDF Page 7 — Step 4: Simplify the Equations
- PDF Page 8 — Step 5: Rewrite as Normal Equations
- PDF Page 9 — Step 5.5: Matrix Notation for Linear Regression
- PDF Page 10 — Matrix Forms of X, y, β
- PDF Page 11 — Step 5.6: Computing XᵀX — Part 1
- PDF Page 12 — Step 5.6: Computing XᵀX — Part 2
- PDF Page 13 — Step 5.7: Computing Xᵀy — Part 1
- PDF Page 14 — Step 5.7: Computing Xᵀy — Part 2
- PDF Page 15 — Step 5.8: Matrix Form of the Normal Equations — Part 1
- PDF Page 16 — Step 5.8: Matrix Form of the Normal Equations — Part 2
- PDF Page 17 — Step 6: Express in Matrix Form
- PDF Page 18 — Step 7: Solve for the Parameters
- PDF Page 19 — Geometric Interpretation
- PDF Page 20 — Example: Calculating OLS Parameters
- PDF Page 21 — Summary: The Least Squares Method
- 全課 Master Concept Map
- 最淺白版本：把整課想成「調兩個旋鈕」
- 重要名詞總表
- Formula Cheat Sheet
- Dimension Cheat Sheet
- 常見混淆與錯誤
- 考試 / 作業型問題速答
- 從這一課連到之後 Machine Learning 的脈絡
- 最後 60 秒記憶版

---

# 0. 先看全課的大方向

這一課其實只想回答一個問題：

> **我們有很多資料點，怎樣找到一條「整體最貼近」資料的直線？**

Simple Linear Regression 的模型是：

$$
\hat y_i=\beta_0+\beta_1x_i
$$

- $x_i$：第 $i$ 個輸入，例如房屋面積。
- $y_i$：第 $i$ 個真實答案，例如真正房價。
- $\hat y_i$：模型對第 $i$ 個資料點的預測。
- $\beta_0$：intercept，截距。
- $\beta_1$：slope，斜率。

真正要找的是：

$$
\beta_0,\ \beta_1
$$

而「最好」的定義是：

$$
\text{令所有 residual 的平方總和最小。}
$$

整條推導鏈是：

```text
資料 (x, y)
   ↓
建立直線 ŷ = β₀ + β₁x
   ↓
Residual: e = y - ŷ
   ↓
平方: e²
   ↓
Loss = Σe²
   ↓
用 Calculus 找 Loss 最小點
   ↓
∂L/∂β₀ = 0，∂L/∂β₁ = 0
   ↓
Normal Equations
   ↓
用 Matrix 寫成 XᵀXβ = Xᵀy
   ↓
乘上 inverse
   ↓
β = (XᵀX)⁻¹Xᵀy
```

這就是整課的骨架。後面每一頁都是在完成其中一個小步驟。

---

# PDF Page 1 — Title：Deriving the Least Squares Solution

## 這一頁在做什麼？

這是標題頁，告訴你這份 supplementary material 的主題是：

**Deriving the Least Squares Solution**，即「推導最小平方解」。

這裡的 **derive** 不是叫你只背公式，而是要你知道：

$$
\boxed{\beta=(X^TX)^{-1}X^Ty}
$$

到底是怎樣一步一步由 linear regression 的 error 推出來。

## 你應該先有的背景

這一課會同時使用三類知識：

1. **Linear Regression**：$\hat y=\beta_0+\beta_1x$
2. **Calculus**：derivative、partial derivative、chain rule、minimum
3. **Linear Algebra**：matrix、transpose、matrix multiplication、inverse

如果你覺得最後公式突然很抽象，原因通常不是 regression 本身，而是三門數學在同一課第一次真正串起來。

## 本頁記憶重點

> **這一課不是教「怎樣用 sklearn 跑 LinearRegression」；是教為什麼 OLS 的答案可以寫成一條 matrix formula。**

---

# PDF Page 2 — Ordinary Least Squares: Mathematical Derivation

教材列出四個目標：

1. Develop the full mathematical derivation of OLS
2. Use calculus to find the parameters that minimize squared error
3. Express the solution in matrix form
4. Derive the closed-form expressions for optimal parameters

## 1. OLS 是什麼？

OLS = **Ordinary Least Squares**。

拆字理解：

- **Least**：最小
- **Squares**：平方
- **Ordinary**：最基本、標準版本的 least squares

所以 OLS 的核心目標是：

$$
\boxed{\min \sum_{i=1}^n (y_i-\hat y_i)^2}
$$

即：

> 找一組模型參數，令所有真實值與預測值之間的誤差平方總和最少。

## 2. 為什麼需要 Calculus？

因為我們最後會得到一個 loss function：

$$
L(\beta_0,\beta_1)
$$

要問的是：

> 哪一組 $\beta_0,\beta_1$ 令 $L$ 最小？

「找函數最低點」正是 calculus 的工作。

## 3. 為什麼又需要 Matrix？

如果只有一個 feature，可以手算 $\beta_0,\beta_1$。

但如果有：

- square footage
- bedrooms
- bathrooms
- age of house
- distance to downtown
- ...

那 parameters 會變成：

$$
\beta_0,\beta_1,\beta_2,\ldots,\beta_p
$$

Matrix 可以一次處理全部。

## 4. Closed-form solution 是什麼？

Closed-form 可以淺白理解為：

> **不用一步一步試，直接有一條公式算出答案。**

OLS 的理論 closed-form solution 是：

$$
\boxed{\beta=(X^TX)^{-1}X^Ty}
$$

## 本頁與下一頁的連接

Page 2 說明「這課要做什麼」。Page 3 開始正式定義最小平方問題。

## 本頁記憶重點

> **Calculus 負責找 minimum；Linear Algebra 負責把答案寫成可擴展到多 features 的 matrix form。**

---

# PDF Page 3 — The Least Squares Problem

## 教材的起點

Linear model：

$$
\boxed{\hat y_i=\beta_0+\beta_1x_i}
$$

目標：找 $\beta_0,\beta_1$ 令：

$$
\boxed{
\sum_{i=1}^{n}(y_i-\hat y_i)^2
=
\sum_{i=1}^{n}\left(y_i-(\beta_0+\beta_1x_i)\right)^2
}
$$

最小。

## 1. $y_i$ 與 $\hat y_i$ 千萬不要混淆

### $y_i$

真實觀察值（actual / observed）。

例如房屋真正售價：

$$
y_i=\$800,000
$$

### $\hat y_i$

模型預測值（predicted / fitted）。

例如：

$$
\hat y_i=\$770,000
$$

### Residual / error

$$
\boxed{e_i=y_i-\hat y_i}
$$

上例：

$$
e_i=800,000-770,000=30,000
$$

## 2. 為什麼不能只加 residual？

假設：

$$
e_1=+30
$$

$$
e_2=-30
$$

如果直接相加：

$$
e_1+e_2=0
$$

看似完全沒有錯，但其實兩個 prediction 都錯了 30。

所以要平方：

$$
30^2=(-30)^2=900
$$

## 3. 平方還有另一個效果

小 error：

$$
2^2=4
$$

大 error：

$$
10^2=100
$$

所以 squared error 會對大誤差懲罰得更重。

## 4. 什麼是 $n$？

$n$ = observations 的數量。

例如有 100 間房屋：

$$
n=100
$$

而：

$$
\sum_{i=1}^{n}
$$

意思是由第 1 個 observation 一直加到第 $n$ 個。

## 5. 這頁真正的問題

不是：

> 「一條直線怎樣畫？」

而是：

> **哪一條直線的 squared errors 合計最小？**

可以想像 $\beta_0$ 和 $\beta_1$ 是兩個旋鈕：

- 改 $\beta_0$：整條線上下移
- 改 $\beta_1$：整條線旋轉、改斜率

每一組 $(\beta_0,\beta_1)$ 都有自己的 total squared error。

## 本頁記憶重點

$$
\boxed{\text{OLS = choose }\beta_0,\beta_1\text{ to minimize }\sum(y_i-\hat y_i)^2}
$$

---

# PDF Page 4 — Step 1: Define the Loss Function

教材正式定義：

$$
\boxed{
L(\beta_0,\beta_1)
=
\sum_{i=1}^{n}(y_i-(\beta_0+\beta_1x_i))^2
}
$$

## 1. Loss Function 是什麼？

Loss function 是：

> **一個數字，用來量度目前這組 parameters 有多差。**

如果 prediction 很接近 reality：

$$
L\text{ 小}
$$

如果 prediction 很差：

$$
L\text{ 大}
$$

## 2. 為什麼寫成 $L(\beta_0,\beta_1)$？

因為資料 $x_i,y_i$ 已經給定。

我們真正能改的是：

$$
\beta_0,\beta_1
$$

所以 loss 是 parameters 的 function。

直覺流程：

```text
選 β₀、β₁
    ↓
得到一條直線
    ↓
得到每個 ŷᵢ
    ↓
計算 yᵢ - ŷᵢ
    ↓
平方
    ↓
全部加起來
    ↓
得到 L(β₀,β₁)
```

## 3. Loss 與 MSE 的關係

教材這裡使用的是 **sum of squared errors (SSE)**：

$$
SSE=\sum e_i^2
$$

如果除以 $n$：

$$
MSE=\frac1n\sum e_i^2
$$

兩者的 minimizer 是一樣的，因為 $1/n$ 只是正的 constant multiplier。教材本頁沒有加入 $1/n$，所以在這份推導中應跟教材寫 SSE 形式。

## 4. 本頁與下一頁的連接

現在已經把「好不好」變成一個可計算的 function。下一步就問：

> 怎樣找 $L(\beta_0,\beta_1)$ 的最低點？

答案：partial derivatives。

## 本頁記憶重點

> **Machine Learning 的 optimization 通常先做的第一件事，就是把「模型有多差」定義成 loss function。**

---

# PDF Page 5 — Step 2: Find Critical Points by Taking Partial Derivatives

教材：

$$
\boxed{\frac{\partial L}{\partial\beta_0}=0}
$$

以及：

$$
\boxed{\frac{\partial L}{\partial\beta_1}=0}
$$

## 1. 為什麼 derivative = 0？

想像一個 U-shape：

```text
Loss
 ↑
 | \        /
 |  \      /
 |   \____/
 |      ↑
 |    minimum
 +----------------→ parameter
```

最低點的 tangent 是水平的，所以 slope = 0。

Derivative 就是在問：

> function 在這一點的 slope 是多少？

因此 minimum 的 critical point 通常滿足：

$$
\frac{dL}{d\beta}=0
$$

## 2. 為什麼是 partial derivative？

因為 loss 同時依賴兩個 variables：

$$
L(\beta_0,\beta_1)
$$

所以要分兩個方向看。

### 對 $\beta_0$

固定 $\beta_1$，只問：

> 改 $\beta_0$ 時，Loss 如何變？

$$
\frac{\partial L}{\partial\beta_0}
$$

### 對 $\beta_1$

固定 $\beta_0$，只問：

> 改 $\beta_1$ 時，Loss 如何變？

$$
\frac{\partial L}{\partial\beta_1}
$$

## 3. Gradient 的概念

可以把兩個 partial derivatives 合起來：

$$
\nabla L=
\begin{bmatrix}
\partial L/\partial\beta_0\\
\partial L/\partial\beta_1
\end{bmatrix}
$$

OLS optimum 的條件就是：

$$
\boxed{\nabla L=0}
$$

## 4. 為什麼這裡能確定是 minimum，而不只是 maximum？

教材這一步主要是利用 critical-point condition。OLS 的 squared-error objective 對線性 parameters 是 convex quadratic；因此其可行的 stationary point 對應 global minimum（在一般 full-rank 情況下是唯一解）。這是補充理解；教材本頁的核心只要求你知道「最佳值時 partial derivatives 設為 0」。

## 本頁記憶重點

> **找最佳 β → 找 Loss 的最低點 → 對每個 β 求 partial derivative → 設成 0。**

---

# PDF Page 6 — Step 3: Calculate the Gradients

教材給出：

$$
\boxed{
\frac{\partial L}{\partial\beta_0}
=-2\sum_{i=1}^{n}(y_i-\beta_0-\beta_1x_i)=0
}
$$

以及：

$$
\boxed{
\frac{\partial L}{\partial\beta_1}
=-2\sum_{i=1}^{n}(y_i-\beta_0-\beta_1x_i)x_i=0
}
$$

這一頁是整課最重要的 Calculus 頁之一。

## 1. 由原本 Loss 開始

$$
L=\sum_{i=1}^n(y_i-\beta_0-\beta_1x_i)^2
$$

先令：

$$
u=y_i-\beta_0-\beta_1x_i
$$

每一項就是：

$$
u^2
$$

Chain Rule：

$$
\frac{d}{dx}u^2=2u\frac{du}{dx}
$$

## 2. 對 $\beta_0$ 求 derivative

內層：

$$
y_i-\beta_0-\beta_1x_i
$$

對 $\beta_0$：

- $y_i$ 是 constant → derivative = 0
- $-\beta_0$ → derivative = -1
- $-\beta_1x_i$ 對 $\beta_0$ 是 constant → 0

所以：

$$
\frac{\partial}{\partial\beta_0}(y_i-\beta_0-\beta_1x_i)=-1
$$

因此：

$$
2(y_i-\beta_0-\beta_1x_i)(-1)
$$

得到：

$$
-2(y_i-\beta_0-\beta_1x_i)
$$

全部 observations 加起來：

$$
\boxed{
\frac{\partial L}{\partial\beta_0}
=-2\sum(y_i-\beta_0-\beta_1x_i)
}
$$

## 3. 對 $\beta_1$ 求 derivative

內層對 $\beta_1$：

$$
\frac{\partial}{\partial\beta_1}(y_i-\beta_0-\beta_1x_i)=-x_i
$$

因此：

$$
2(y_i-\beta_0-\beta_1x_i)(-x_i)
$$

即：

$$
\boxed{
-2(y_i-\beta_0-\beta_1x_i)x_i
}
$$

全部加起來：

$$
\boxed{
\frac{\partial L}{\partial\beta_1}
=-2\sum(y_i-\beta_0-\beta_1x_i)x_i
}
$$

## 4. 為什麼第二條突然多了一個 $x_i$？

不是額外「加」上去，而是 chain rule 的內層 derivative：

$$
\frac{\partial(-\beta_1x_i)}{\partial\beta_1}=-x_i
$$

所以自然產生 $x_i$。

## 5. 最容易犯的錯

### 錯誤 A

把 $x_i$ 當成 variable 對 $\beta_1$ 一起求 derivative。

在這個 optimization 裡，$x_i$ 是已知資料，因此對 $\beta_1$ 是 constant。

### 錯誤 B

忘記 chain rule 的負號。

內層 derivative 是 $-1$ 或 $-x_i$，所以前面才有 $-2$。

## 本頁記憶重點

$$
\frac{\partial L}{\partial\beta_0}
\Rightarrow \text{residual 的總和}
$$

$$
\frac{\partial L}{\partial\beta_1}
\Rightarrow \text{residual} \times x_i \text{ 的總和}
$$

---

# PDF Page 7 — Step 4: Simplify the Equations

教材將 Page 6 的 $-2$ 去掉，得到：

$$
\boxed{
\sum_{i=1}^{n}(y_i-\beta_0-\beta_1x_i)=0
}
$$

$$
\boxed{
\sum_{i=1}^{n}(y_i-\beta_0-\beta_1x_i)x_i=0
}
$$

## 1. 為什麼 $-2$ 可以消失？

如果：

$$
-2A=0
$$

兩邊除以 $-2$：

$$
A=0
$$

所以 $-2$ 不影響解。

## 2. 第一條 equation 的統計意義

Residual：

$$
e_i=y_i-\beta_0-\beta_1x_i
$$

所以第一條是：

$$
\boxed{\sum e_i=0}
$$

即 fitted OLS model（包含 intercept 時）的 residual 正負會平衡。

## 3. 第二條 equation 的意義

$$
\sum e_ix_i=0
$$

代表 residual 與 input direction 之間的 dot-product 型加總為 0。

這一點後面 Page 19 的 geometric interpretation 會重新出現：residual 與 design matrix 的 column space orthogonal。

## 4. 本頁扮演的角色

Page 6 是 calculus 形式；Page 7 已經把 calculus 外殼移除，剩下一組 algebra equations。

下一頁要展開這兩條 equations，形成 **Normal Equations**。

## 本頁記憶重點

> **Derivative = 0 之後，問題由 Calculus 轉成 Algebra。**

---

# PDF Page 8 — Step 5: Rewrite as Normal Equations

教材把兩條 equation 展開，得到：

$$
\boxed{
\beta_0n+\beta_1\sum_{i=1}^n x_i
=
\sum_{i=1}^n y_i
}
$$

$$
\boxed{
\beta_0\sum_{i=1}^n x_i
+
\beta_1\sum_{i=1}^n x_i^2
=
\sum_{i=1}^n x_iy_i
}
$$

這兩條就是 **Normal Equations**。

## 1. 第一條怎樣來？

由：

$$
\sum(y_i-\beta_0-\beta_1x_i)=0
$$

拆開：

$$
\sum y_i-\sum\beta_0-\sum\beta_1x_i=0
$$

因為 $\beta_0$ 是 constant：

$$
\sum_{i=1}^{n}\beta_0=n\beta_0
$$

因為 $\beta_1$ 是 constant：

$$
\sum\beta_1x_i=\beta_1\sum x_i
$$

所以：

$$
\sum y_i-n\beta_0-\beta_1\sum x_i=0
$$

移項：

$$
\boxed{n\beta_0+\beta_1\sum x_i=\sum y_i}
$$

## 2. 第二條怎樣來？

由：

$$
\sum(y_i-\beta_0-\beta_1x_i)x_i=0
$$

先乘入 $x_i$：

$$
\sum(y_ix_i-\beta_0x_i-\beta_1x_i^2)=0
$$

拆開：

$$
\sum x_iy_i-\beta_0\sum x_i-\beta_1\sum x_i^2=0
$$

移項：

$$
\boxed{
\beta_0\sum x_i+\beta_1\sum x_i^2=\sum x_iy_i
}
$$

## 3. 為什麼叫 Normal Equations？

教材稱這組由 least-squares first-order conditions 得到的 linear system 為 normal equations。

你現階段不需要把「normal」理解成「normalize 資料」。它不是 feature normalization 的意思。

## 4. 這時其實已經可以手算

因為有兩個 unknowns：

$$
\beta_0,\beta_1
$$

亦有兩條 equations，所以可以用 simultaneous equations 解。

但課程不在這裡停下來，因為它要建立可以 generalize 到多個 predictors 的 matrix solution。

## 本頁記憶重點

> **Normal Equations = 將 derivative = 0 展開後得到的一組 linear equations。**

---

# PDF Page 9 — Step 5.5: Matrix Notation for Linear Regression

教材開始定義三個核心物件：

1. Design matrix $X$
2. Parameter vector $\beta$
3. Response vector $y$

## 1. Design Matrix $X$

Simple linear regression：

$$
X=
\begin{bmatrix}
1 & x_1\\
1 & x_2\\
\vdots & \vdots\\
1 & x_n
\end{bmatrix}
$$

每一 row = 一個 data point。

第一 column 全部是 1；第二 column 是 $x_i$。

## 2. 為什麼第一 column 全是 1？

因為：

$$
\begin{bmatrix}1 & x_i\end{bmatrix}
\begin{bmatrix}\beta_0\\\beta_1\end{bmatrix}
=
1\cdot\beta_0+x_i\beta_1
$$

即：

$$
\beta_0+\beta_1x_i
$$

如果沒有那一列 1，matrix multiplication 就沒有地方產生 intercept $\beta_0$。

## 3. Parameter Vector

$$
\boxed{
\beta=
\begin{bmatrix}
\beta_0\\
\beta_1
\end{bmatrix}
}
$$

它放的是「模型要學的 parameters」。

## 4. Response Vector

$$
\boxed{
y=
\begin{bmatrix}
y_1\\
y_2\\
\vdots\\
y_n
\end{bmatrix}
}
$$

它放的是所有 observed target values。

## 5. Design Matrix 為什麼叫 design？

因為 $X$ 不只是原始 feature；它的 columns 代表模型設計中的 basis/terms。

Simple regression：

```text
Column 1 → intercept term
Column 2 → x term
```

如果是 polynomial regression，還可以加入：

```text
1, x, x², x³, ...
```

所以 design matrix 可以看成「模型用哪些欄來解釋 y」。

## 本頁記憶重點

$$
\boxed{X=\text{input/design},\quad \beta=\text{parameters},\quad y=\text{actual output}}
$$

---

# PDF Page 10 — Matrix Forms of X, y, β

這一頁主要把 Page 9 的文字定義真正寫成 matrix：

$$
X=
\begin{bmatrix}
1 & x_1\\
1 & x_2\\
\vdots & \vdots\\
1 & x_n
\end{bmatrix},
\quad
y=
\begin{bmatrix}
y_1\\y_2\\\vdots\\y_n
\end{bmatrix},
\quad
\beta=
\begin{bmatrix}\beta_0\\\beta_1\end{bmatrix}
$$

## 1. Dimension 是這頁真正要掌握的東西

如果有 $n$ 個 observations：

$$
X:n\times2
$$

$$
y:n\times1
$$

$$
\beta:2\times1
$$

## 2. 為什麼 $X\beta$ 可以乘？

$$
(n\times2)(2\times1)
$$

Matrix multiplication 規則：中間 dimensions 要相同。

這裡：

$$
2=2
$$

所以可以乘，結果是：

$$
n\times1
$$

正好是一個 prediction vector：

$$
\hat y=
\begin{bmatrix}
\hat y_1\\
\hat y_2\\
\vdots\\
\hat y_n
\end{bmatrix}
$$

## 3. 核心 matrix model

$$
\boxed{\hat y=X\beta}
$$

淺白翻譯：

> **資料矩陣 × 模型參數 = 所有 predictions。**

## 4. 一個 3 筆資料的小例子

假設：

$$
X=
\begin{bmatrix}
1&10\\
1&20\\
1&30
\end{bmatrix}
$$

$$
\beta=
\begin{bmatrix}
5\\2
\end{bmatrix}
$$

則：

$$
X\beta=
\begin{bmatrix}
1(5)+10(2)\\
1(5)+20(2)\\
1(5)+30(2)
\end{bmatrix}
=
\begin{bmatrix}
25\\45\\65
\end{bmatrix}
$$

所以：

$$
\hat y=5+2x
$$

## 本頁記憶重點

> **如果 dimension 不懂，後面的 $X^TX$、$X^Ty$ 會很容易迷路。先牢記：$X$ 是 $n\times2$，$\beta$ 是 $2\times1$。**

---

# PDF Page 11 — Step 5.6: Computing XᵀX — Part 1

教材開始計算：

$$
\boxed{X^TX}
$$

## 1. 原本 $X$

$$
X=
\begin{bmatrix}
1&x_1\\
1&x_2\\
\vdots&\vdots\\
1&x_n
\end{bmatrix}
$$

Dimension：

$$
n\times2
$$

## 2. Transpose 之後

$$
X^T=
\begin{bmatrix}
1&1&\cdots&1\\
x_1&x_2&\cdots&x_n
\end{bmatrix}
$$

Dimension：

$$
2\times n
$$

Transpose 只做一件事：

> rows 變 columns；columns 變 rows。

## 3. 所以 $X^TX$ 的 dimension

$$
(2\times n)(n\times2)
$$

中間 $n=n$，可以乘。

結果：

$$
\boxed{2\times2}
$$

## 4. 為什麼會是 2×2？

因為 simple regression 有兩個 parameters：

$$
\beta_0,\beta_1
$$

最後要建立一個兩條 equations 的 system，所以出現 2×2 coefficient matrix 是合理的。

## 5. 本頁只是「排好乘法」

這一頁還沒有正式把四個格子的數值算完。Page 12 才會逐格計算。

## 本頁記憶重點

$$
X:n\times2
\Rightarrow
X^T:2\times n
\Rightarrow
X^TX:2\times2
$$

---

# PDF Page 12 — Step 5.6: Computing XᵀX — Part 2

教材算出：

$$
\boxed{
X^TX=
\begin{bmatrix}
n & \sum_{i=1}^n x_i\\
\sum_{i=1}^n x_i & \sum_{i=1}^n x_i^2
\end{bmatrix}
}
$$

這頁非常重要，因為你會第一次看到 Normal Equations 的係數從 matrix multiplication 自動出現。

## 1. 左上角

第一 row of $X^T$：

$$
[1,1,\ldots,1]
$$

第一 column of $X$：

$$
[1,1,\ldots,1]^T
$$

Dot product：

$$
1\cdot1+1\cdot1+\cdots+1\cdot1=n
$$

所以左上角：

$$
\boxed{n}
$$

## 2. 右上角

$$
1x_1+1x_2+\cdots+1x_n
$$

得到：

$$
\boxed{\sum x_i}
$$

## 3. 左下角

$$
x_1(1)+x_2(1)+\cdots+x_n(1)
$$

同樣：

$$
\boxed{\sum x_i}
$$

## 4. 右下角

$$
x_1x_1+x_2x_2+\cdots+x_nx_n
$$

即：

$$
\boxed{\sum x_i^2}
$$

## 5. 為什麼矩陣是對稱的？

$$
X^TX
$$

一定是 symmetric：

$$
(X^TX)^T=X^TX
$$

所以右上角與左下角相同，這裡都是 $\sum x_i$。

## 6. 與 Page 8 的驚人對應

Page 8 的 Normal Equations 左邊係數是：

$$
n,\ \sum x_i,\ \sum x_i^2
$$

而現在 $X^TX$ 恰好自動生成同樣的結構。

這不是巧合；這就是為什麼 normal equations 可以壓縮成 matrix form。

## 本頁記憶重點

$$
\boxed{
X^TX=
\begin{bmatrix}
n & \sum x\\
\sum x & \sum x^2
\end{bmatrix}
}
$$

---

# PDF Page 13 — Step 5.7: Computing Xᵀy — Part 1

這一頁開始計算 normal equations 的右邊：

$$
\boxed{X^Ty}
$$

## 1. Matrix dimensions

$$
X^T:2\times n
$$

$$
y:n\times1
$$

所以：

$$
(2\times n)(n\times1)=2\times1
$$

結果會是一個有兩個 elements 的 vector。

## 2. 為什麼右邊需要兩個 elements？

因為我們的 normal equations 有兩條：

$$
\begin{cases}
\cdots=\sum y_i\\
\cdots=\sum x_iy_i
\end{cases}
$$

所以右邊本來就是兩個數。

## 3. 這頁先排出 multiplication

$$
X^Ty=
\begin{bmatrix}
1&1&\cdots&1\\
x_1&x_2&\cdots&x_n
\end{bmatrix}
\begin{bmatrix}
y_1\\y_2\\\vdots\\y_n
\end{bmatrix}
$$

Page 14 再真正算出結果。

## 本頁記憶重點

> **$X^TX$ 產生 normal equations 左邊的 coefficient structure；$X^Ty$ 會產生右邊的 data sums。**

---

# PDF Page 14 — Step 5.7: Computing Xᵀy — Part 2

教材得到：

$$
\boxed{
X^Ty=
\begin{bmatrix}
\sum_{i=1}^n y_i\\
\sum_{i=1}^n x_iy_i
\end{bmatrix}
}
$$

## 1. 第一個 element

第一 row：

$$
[1,1,\ldots,1]
$$

與 $y$ 做 dot product：

$$
1y_1+1y_2+\cdots+1y_n
$$

所以：

$$
\boxed{\sum y_i}
$$

## 2. 第二個 element

第二 row：

$$
[x_1,x_2,\ldots,x_n]
$$

與 $y$ 做 dot product：

$$
x_1y_1+x_2y_2+\cdots+x_ny_n
$$

所以：

$$
\boxed{\sum x_iy_i}
$$

## 3. 這一步的直覺

$X^Ty$ 把每個 design-column 與 target $y$ 做 dot product。

Simple regression 中：

- intercept column（全 1）與 $y$ → $\sum y$
- x column 與 $y$ → $\sum xy$

## 4. 到目前為止我們有兩個重要 building blocks

$$
X^TX=
\begin{bmatrix}
n&\sum x\\
\sum x&\sum x^2
\end{bmatrix}
$$

$$
X^Ty=
\begin{bmatrix}
\sum y\\
\sum xy
\end{bmatrix}
$$

下一頁就是把兩邊接起來。

## 本頁記憶重點

$$
\boxed{X^Ty=[\sum y,\ \sum xy]^T}
$$

---

# PDF Page 15 — Step 5.8: Matrix Form of the Normal Equations — Part 1

教材先重列 normal equations：

$$
\beta_0n+\beta_1\sum x_i=\sum y_i
$$

$$
\beta_0\sum x_i+\beta_1\sum x_i^2=\sum x_iy_i
$$

然後寫成：

$$
\boxed{
\begin{bmatrix}
n&\sum x_i\\
\sum x_i&\sum x_i^2
\end{bmatrix}
\begin{bmatrix}
\beta_0\\\beta_1
\end{bmatrix}
=
\begin{bmatrix}
\sum y_i\\\sum x_iy_i
\end{bmatrix}
}
$$

## 1. 為什麼這個 matrix multiplication 等於兩條 equations？

左邊第一 row：

$$
n\beta_0+(\sum x_i)\beta_1
$$

正是第一條 normal equation。

左邊第二 row：

$$
(\sum x_i)\beta_0+(\sum x_i^2)\beta_1
$$

正是第二條。

## 2. 這是 linear system 的 matrix form

普通 simultaneous equations：

$$
\begin{cases}
a\beta_0+b\beta_1=c\\
d\beta_0+e\beta_1=f
\end{cases}
$$

可以寫成：

$$
\begin{bmatrix}a&b\\d&e\end{bmatrix}
\begin{bmatrix}\beta_0\\\beta_1\end{bmatrix}
=
\begin{bmatrix}c\\f\end{bmatrix}
$$

這頁完全是在做同一件事，只是 $a,b,d,e,c,f$ 都由 data sums 構成。

## 3. 為什麼這一步非常關鍵？

因為從這一刻開始，我們不需要再分別處理兩條 scalar equations。

整個問題可以作為一個 matrix equation 一次操作。

## 本頁記憶重點

> **Normal equations 並沒有消失；Matrix form 只是把它們壓縮。**

---

# PDF Page 16 — Step 5.8: Matrix Form of the Normal Equations — Part 2

教材指出上一頁的 matrix equation 正是：

$$
\boxed{X^TX\beta=X^Ty}
$$

這一行是整課的核心橋樑。

## 1. 左邊為什麼是 $X^TX\beta$？

Page 12：

$$
X^TX=
\begin{bmatrix}
n&\sum x\\
\sum x&\sum x^2
\end{bmatrix}
$$

而：

$$
\beta=
\begin{bmatrix}\beta_0\\\beta_1\end{bmatrix}
$$

所以：

$$
X^TX\beta
$$

就是上一頁左邊。

## 2. 右邊為什麼是 $X^Ty$？

Page 14 已經算出：

$$
X^Ty=
\begin{bmatrix}\sum y\\\sum xy\end{bmatrix}
$$

所以右邊完全吻合。

## 3. 這條 equation 從哪裡來？

一定要記住它的來源鏈：

```text
Minimize squared error
      ↓
Partial derivatives = 0
      ↓
Two scalar normal equations
      ↓
Matrix notation
      ↓
XᵀXβ = Xᵀy
```

不要把 $X^TX\beta=X^Ty$ 當成一條憑空需要死背的公式。

## 4. 下一步

現在問題已經變成：

> 如何由 $X^TX\beta=X^Ty$ 把 $\beta$ 單獨解出來？

這會使用 matrix inverse。

## 本頁記憶重點

$$
\boxed{\text{Calculus result} \Longrightarrow X^TX\beta=X^Ty}
$$

---

# PDF Page 17 — Step 6: Express in Matrix Form

這一頁再次整理 matrix notation，並以 3 個 data points 作示例：

$$
X=
\begin{bmatrix}
1&x_1\\
1&x_2\\
1&x_3
\end{bmatrix},
\quad
y=
\begin{bmatrix}
y_1\\y_2\\y_3
\end{bmatrix},
\quad
\beta=
\begin{bmatrix}\beta_0\\\beta_1\end{bmatrix}
$$

以及：

$$
\boxed{X^TX\beta=X^Ty}
$$

## 1. 為什麼教材又重講一次？

前幾頁是「證明 $X^TX$ 和 $X^Ty$ 怎樣產生」。

這一頁是把所有符號重新集中，讓你在正式 solve parameters 前確認：

- $X$ 是什麼
- $y$ 是什麼
- $\beta$ 是什麼
- 它們的 shapes 是什麼

## 2. 3 data points 的 dimensions

$$
X:3\times2
$$

$$
X^T:2\times3
$$

$$
X^TX:2\times2
$$

$$
\beta:2\times1
$$

$$
y:3\times1
$$

$$
X^Ty:2\times1
$$

左右兩邊：

$$
(2\times2)(2\times1)=2\times1
$$

與：

$$
(2\times3)(3\times1)=2\times1
$$

dimensions 完全一致。

## 3. Dimension checking 是非常好的自我檢查方法

如果你寫成：

$$
XX^T\beta
$$

simple regression 下：

$$
XX^T:n\times n
$$

而 $\beta$ 是 $2\times1$，通常無法相乘。

因此 dimension 可以幫你辨別 transpose 放錯位置。

## 本頁記憶重點

> **遇到 matrix formula 看不懂時，先寫 shapes。Shape 往往比死背更可靠。**

---

# PDF Page 18 — Step 7: Solve for the Parameters

這是整課最後求解的核心頁。

教材由：

$$
X^TX\beta=X^Ty
$$

左乘：

$$
(X^TX)^{-1}
$$

得到：

$$
\boxed{\beta=(X^TX)^{-1}X^Ty}
$$

同時教材給 simple linear regression 的 scalar formulas：

$$
\boxed{
\beta_1=
\frac{\sum_{i=1}^n(x_i-\bar x)(y_i-\bar y)}
{\sum_{i=1}^n(x_i-\bar x)^2}
=
\frac{Cov(X,Y)}{Var(X)}
}
$$

以及：

$$
\boxed{\beta_0=\bar y-\beta_1\bar x}
$$

## 1. 為什麼乘 inverse？

普通 scalar：

$$
5\beta=10
$$

會除以 5：

$$
\beta=5^{-1}10=2
$$

Matrix 沒有普通的「除法」，所以用 inverse：

$$
A\beta=b
$$

若 $A^{-1}$ 存在：

$$
A^{-1}A\beta=A^{-1}b
$$

因為：

$$
A^{-1}A=I
$$

以及：

$$
I\beta=\beta
$$

所以：

$$
\beta=A^{-1}b
$$

在 OLS 中：

$$
A=X^TX,
\quad b=X^Ty
$$

因此：

$$
\boxed{\beta=(X^TX)^{-1}X^Ty}
$$

## 2. Matrix multiplication 的順序不能亂

$$
(X^TX)^{-1}X^Ty
$$

不是可以隨意改成：

$$
X^T(X^TX)^{-1}y
$$

Matrix multiplication 一般不具交換律：

$$
AB\neq BA
$$

## 3. $\beta_1=Cov/Var$ 的直覺

$$
\beta_1=\frac{Cov(X,Y)}{Var(X)}
$$

可理解成：

> **X 與 Y 一起變動的程度 ÷ X 自己變動的程度。**

如果 X 增加時 Y 通常也增加：

$$
Cov(X,Y)>0
$$

所以：

$$
\beta_1>0
$$

如果 X 增加時 Y 通常下降：

$$
Cov(X,Y)<0
$$

所以：

$$
\beta_1<0
$$

## 4. Intercept 公式的直覺

$$
\beta_0=\bar y-\beta_1\bar x
$$

重排：

$$
\bar y=\beta_0+\beta_1\bar x
$$

所以 fitted regression line 會通過：

$$
\boxed{(\bar x,\bar y)}
$$

即資料的平均中心點。

## 5. 關於 inverse 的重要實務補充

教材用 $(X^TX)^{-1}$ 展示 closed-form derivation。實際數值計算中，若 $X^TX$ 不可逆或接近 singular，通常會使用更穩定的 linear solver、QR decomposition 或 SVD / pseudoinverse，而不是顯式計算 inverse。這是延伸理解；教材本頁的理論公式仍是 $(X^TX)^{-1}X^Ty$。

## 本頁記憶重點

$$
\boxed{\beta=(X^TX)^{-1}X^Ty}
$$

是整個推導的終點，不是起點。

---

# PDF Page 19 — Geometric Interpretation

教材給出三個幾何觀念：

1. residuals orthogonal to the column space of $X$
2. $\hat y$ is the orthogonal projection of $y$ onto the column space of $X$
3. $\hat y$ is the closest point in that column space to the actual $y$

這一頁比較抽象，但它其實是在用幾何語言重新解釋「least squares」。

## 1. 為什麼 $y$ 不一定等於 $X\beta$？

真實資料通常有 noise，因此可能不存在任何 $\beta$ 可以令：

$$
y=X\beta
$$

完全成立。

所以我們只能找：

$$
\hat y=X\hat\beta
$$

令它最接近 $y$。

## 2. Projection 的圖像

```text
              y  •
                 |\
                 | \
       residual  |  \
              e  |   \
                 |    \
                 ↓     \
-----------------•----------------  column space of X
                ŷ
```

- $y$：真正 target vector
- $\hat y$：模型能產生、而且最接近 $y$ 的 vector
- $e=y-\hat y$：residual vector

## 3. Orthogonal 是什麼？

Orthogonal = perpendicular = 垂直。

Vector 語言：

$$
a^Tb=0
$$

代表兩個 vectors orthogonal。

OLS optimum 有：

$$
\boxed{X^Te=0}
$$

## 4. 怎樣由 geometric condition 回到 normal equation？

Residual：

$$
e=y-\hat y
$$

而：

$$
\hat y=X\beta
$$

所以：

$$
e=y-X\beta
$$

Orthogonality：

$$
X^Te=0
$$

代入：

$$
X^T(y-X\beta)=0
$$

展開：

$$
X^Ty-X^TX\beta=0
$$

移項：

$$
\boxed{X^TX\beta=X^Ty}
$$

你會看到：

> Calculus 與 Geometry 最後得到同一條 normal equation。

## 5. 「closest point」到底是什麼意思？

Least squares minimize：

$$
\|y-X\beta\|_2^2
$$

即找 column space of $X$ 中，與 $y$ Euclidean distance 最小的 point。

所以 「least squares」在幾何上就是 nearest projection。

## 本頁記憶重點

> **OLS 的 prediction $\hat y$ 是 $y$ 投影到模型可表示空間中的最近點；residual 則與該空間垂直。**

---

# PDF Page 20 — Example: Calculating OLS Parameters

教材提供資料：

| x | y |
|---:|---:|
| 1 | 2 |
| 2 | 3 |
| 3 | 5 |

教材畫面接著計算 $\bar x$、$\bar y$、slope 與 intercept。

## 1. 平均值

$$
\bar x=\frac{1+2+3}{3}=2
$$

$$
\bar y=\frac{2+3+5}{3}=\frac{10}{3}\approx3.33
$$

## 2. 按教材所列資料與公式重新逐步計算 numerator

$$
\sum(x_i-\bar x)(y_i-\bar y)
$$

第 1 點：

$$
(1-2)(2-3.33)\approx(-1)(-1.33)=1.33
$$

第 2 點：

$$
(2-2)(3-3.33)=0
$$

第 3 點：

$$
(3-2)(5-3.33)\approx(1)(1.67)=1.67
$$

合計約：

$$
1.33+0+1.67=3.00
$$

精確值也是：

$$
3
$$

## 3. Denominator

$$
\sum(x_i-\bar x)^2
$$

$$
=(1-2)^2+(2-2)^2+(3-2)^2
$$

$$
=1+0+1=2
$$

## 4. 依資料本身計算 slope

$$
\beta_1=\frac{3}{2}=1.5
$$

## 5. Intercept

$$
\beta_0=\bar y-\beta_1\bar x
$$

$$
=\frac{10}{3}-1.5(2)
$$

$$
=\frac{1}{3}\approx0.333
$$

因此依照表中三個 data points 的 arithmetic verification：

$$
\boxed{\hat y\approx0.333+1.5x}
$$

## 6. 【重要：教材本頁數值不一致】

教材 Page 20 的畫面文字顯示的最終數值約為：

$$
\beta_1=1.33,\quad \beta_0=0.67
$$

以及：

$$
\hat y=0.67+1.33x
$$

但如果嚴格使用同一頁表格所列資料 $(1,2),(2,3),(3,5)$ 和教材 Page 18 所列 slope 公式，會得到：

$$
\beta_1=1.5,\quad \beta_0\approx0.333
$$

因此這裡應視為 **source slide 的 numerical inconsistency / typo**。學習時要分開記：

- **教材畫面報告值**：$1.33, 0.67$
- **按教材資料與公式重算值**：$1.5, 0.333$

不要為了配合投影片數字而改動公式。

## 7. 用正確重算值檢查 predictions

$$
\hat y=0.333+1.5x
$$

### x = 1

$$
\hat y\approx1.833
$$

Residual：

$$
2-1.833\approx0.167
$$

### x = 2

$$
\hat y\approx3.333
$$

Residual：

$$
3-3.333\approx-0.333
$$

### x = 3

$$
\hat y\approx4.833
$$

Residual：

$$
5-4.833\approx0.167
$$

Residual sum：

$$
0.167-0.333+0.167\approx0
$$

正好對應 Page 7 的：

$$
\sum e_i=0
$$

## 本頁記憶重點

> **例子最重要的是計算流程：mean → centered products → slope → intercept；本頁教材的最終數值本身有不一致，要以公式與原始 data 驗算。**

---

# PDF Page 21 — Summary: The Least Squares Method

教材最後總結六點：

1. Use calculus to find parameter values that minimize squared error
2. Set partial derivatives to zero
3. Solve normal equations using matrix algebra
4. Closed-form solution is $\beta=(X^TX)^{-1}X^Ty$
5. Simple regression parameters depend on means and covariances
6. The approach generalizes to multiple regression with many predictors

下面把這六點重新串成完整邏輯。

## 1. 先定義模型

$$
\hat y_i=\beta_0+\beta_1x_i
$$

## 2. 定義 loss

$$
L(\beta_0,\beta_1)
=
\sum(y_i-\beta_0-\beta_1x_i)^2
$$

## 3. Calculus 找 minimum

$$
\frac{\partial L}{\partial\beta_0}=0
$$

$$
\frac{\partial L}{\partial\beta_1}=0
$$

## 4. 得到 normal equations

$$
n\beta_0+\beta_1\sum x=\sum y
$$

$$
\beta_0\sum x+\beta_1\sum x^2=\sum xy
$$

## 5. Matrix form

$$
\boxed{X^TX\beta=X^Ty}
$$

## 6. Solve

$$
\boxed{\beta=(X^TX)^{-1}X^Ty}
$$

## 7. Simple regression 可化成

$$
\boxed{
\beta_1=
\frac{\sum(x_i-\bar x)(y_i-\bar y)}
{\sum(x_i-\bar x)^2}
}
$$

$$
\boxed{\beta_0=\bar y-\beta_1\bar x}
$$

## 8. Multiple Linear Regression 不需要重新發明方法

如果多個 features：

$$
\hat y
=
\beta_0+
\beta_1x_1+
\beta_2x_2+
\cdots+
\beta_px_p
$$

只要把 $X$ 擴充成更多 columns：

$$
X=
\begin{bmatrix}
1&x_{11}&x_{12}&\cdots&x_{1p}\\
1&x_{21}&x_{22}&\cdots&x_{2p}\\
\vdots&\vdots&\vdots&&\vdots\\
1&x_{n1}&x_{n2}&\cdots&x_{np}
\end{bmatrix}
$$

而 $\beta$ 變成：

$$
\beta=
\begin{bmatrix}
\beta_0\\\beta_1\\\vdots\\\beta_p
\end{bmatrix}
$$

核心 matrix equation 仍然是：

$$
X^TX\beta=X^Ty
$$

理論 closed-form 仍是：

$$
\boxed{\beta=(X^TX)^{-1}X^Ty}
$$

## 本頁記憶重點

> **這課真正要你帶走的不是單一 formula，而是「Error → Loss → Derivative → Normal Equations → Matrix → β」整條推導鏈。**

---

# 全課 Master Concept Map

```text
Observed Data (X, y)
        ↓
Linear Regression Model: ŷ = Xβ
        ↓
Residual: e = y - ŷ
        ↓
Squared-error Loss: Σeᵢ²
        ↓  minimize
∂L/∂β₀ = 0,  ∂L/∂β₁ = 0
        ↓
Normal Equations
        ↓
XᵀXβ = Xᵀy
        ↓  left multiply by (XᵀX)⁻¹
β = (XᵀX)⁻¹Xᵀy
        ↓
Best fitted model: ŷ = Xβ
```

---

# 最淺白版本：把整課想成「調兩個旋鈕」

假設你要畫一條線：

$$
\hat y=\beta_0+\beta_1x
$$

你有兩個旋鈕：

- $\beta_0$：整條線上下移
- $\beta_1$：改變線的斜率

你每調一次，就計算：

$$
\sum(y_i-\hat y_i)^2
$$

數字越小，代表線越好。

Calculus 的作用不是「逐個亂試」，而是數學上直接找出：

> 哪個位置再往任何 parameter direction 走都不會令 loss 更低。

那就是：

$$
\frac{\partial L}{\partial\beta_0}=0,
\quad
\frac{\partial L}{\partial\beta_1}=0
$$

再將兩條 equations 用 matrix 打包，就得到 OLS formula。

---

# 重要名詞總表

| 名詞 | 符號 | 淺白意思 |
|---|---|---|
| Input / feature | $x_i$ | 模型拿來預測的資料 |
| Observed target | $y_i$ | 真實答案 |
| Prediction | $\hat y_i$ | 模型估計答案 |
| Intercept | $\beta_0$ | $x=0$ 時模型的基準值 |
| Slope | $\beta_1$ | $x$ 每增加 1，預測 y 改變多少 |
| Residual | $e_i=y_i-\hat y_i$ | 真實值減預測值 |
| SSE | $\sum e_i^2$ | 所有 residual 平方總和 |
| Loss function | $L(\beta)$ | 衡量目前 parameters 有多差 |
| Partial derivative | $\partial L/\partial\beta_j$ | 只改某個 parameter 時 loss 的 slope |
| Normal equations | $X^TX\beta=X^Ty$ | OLS first-order conditions 的 matrix form |
| Design matrix | $X$ | 所有 observations / predictors 的矩陣 |
| Parameter vector | $\beta$ | 所有 regression coefficients |
| Response vector | $y$ | 所有 observed targets |
| Transpose | $X^T$ | row/column 互換 |
| Inverse | $A^{-1}$ | 滿足 $A^{-1}A=I$ 的矩陣 |
| Projection | $\hat y$ | $y$ 在 column space of X 上的最近點 |
| Orthogonal | $a^Tb=0$ | vectors 垂直 / dot product = 0 |

---

# Formula Cheat Sheet

## Model

$$
\boxed{\hat y_i=\beta_0+\beta_1x_i}
$$

## Residual

$$
\boxed{e_i=y_i-\hat y_i}
$$

## Loss / SSE

$$
\boxed{
L(\beta_0,\beta_1)
=
\sum_{i=1}^n(y_i-\beta_0-\beta_1x_i)^2
}
$$

## First-order conditions

$$
\boxed{
\frac{\partial L}{\partial\beta_0}
=-2\sum(y_i-\beta_0-\beta_1x_i)=0
}
$$

$$
\boxed{
\frac{\partial L}{\partial\beta_1}
=-2\sum(y_i-\beta_0-\beta_1x_i)x_i=0
}
$$

## Normal equations — scalar

$$
\boxed{n\beta_0+\beta_1\sum x_i=\sum y_i}
$$

$$
\boxed{\beta_0\sum x_i+\beta_1\sum x_i^2=\sum x_iy_i}
$$

## Design matrices

$$
X=
\begin{bmatrix}
1&x_1\\
1&x_2\\
\vdots&\vdots\\
1&x_n
\end{bmatrix}
$$

$$
\beta=
\begin{bmatrix}\beta_0\\\beta_1\end{bmatrix}
$$

$$
y=
\begin{bmatrix}y_1\\y_2\\\vdots\\y_n\end{bmatrix}
$$

## Matrix normal equation

$$
\boxed{X^TX\beta=X^Ty}
$$

## Closed-form OLS

$$
\boxed{\beta=(X^TX)^{-1}X^Ty}
$$

## Simple regression slope

$$
\boxed{
\beta_1=
\frac{\sum(x_i-\bar x)(y_i-\bar y)}
{\sum(x_i-\bar x)^2}
}
$$

## Covariance / variance form

$$
\boxed{\beta_1=\frac{Cov(X,Y)}{Var(X)}}
$$

## Intercept

$$
\boxed{\beta_0=\bar y-\beta_1\bar x}
$$

## Prediction vector

$$
\boxed{\hat y=X\beta}
$$

## Residual vector

$$
\boxed{e=y-X\beta}
$$

## Orthogonality at optimum

$$
\boxed{X^Te=0}
$$

---

# Dimension Cheat Sheet

Simple Linear Regression，有 $n$ 個 observations：

| Object | Dimension | 說明 |
|---|---:|---|
| $X$ | $n\times2$ | intercept column + one feature |
| $X^T$ | $2\times n$ | transpose |
| $\beta$ | $2\times1$ | $\beta_0,\beta_1$ |
| $y$ | $n\times1$ | observed targets |
| $X\beta$ | $n\times1$ | predictions |
| $X^TX$ | $2\times2$ | normal-equation coefficient matrix |
| $X^Ty$ | $2\times1$ | right-hand-side vector |
| $(X^TX)^{-1}$ | $2\times2$ | inverse if it exists |

General multiple regression，如果有 $p$ 個 predictors，加 intercept 後共 $p+1$ 個 parameters：

$$
X:n\times(p+1)
$$

$$
\beta:(p+1)\times1
$$

$$
X^TX:(p+1)\times(p+1)
$$

$$
X^Ty:(p+1)\times1
$$

---

# 常見混淆與錯誤

## 1. $y$ vs $\hat y$

- $y$ = actual
- $\hat y$ = predicted

## 2. residual vs squared residual

Residual：

$$
e=y-\hat y
$$

OLS loss：

$$
e^2
$$

不是直接把 residuals 加起來。

## 3. $X^T$ 不是平方

$$
X^T=\text{transpose}
$$

$$
x^2=\text{square}
$$

完全不同。

## 4. $A^{-1}$ 不等於每個 element 隨便取 reciprocal

Matrix inverse 是整體的 linear-algebra operation。

## 5. Normal equation 不是 normalization

它與把 features 做 standardization / normalization 是兩回事。

## 6. Closed form 不等於實務一定真的「算 inverse」

教材用 inverse 推導公式；數值實作常使用 solver / QR / SVD。

## 7. OLS 最小的是整體 squared error

不是保證每一個 data point 的 residual 都是最小，也不是所有 residual 都等於 0。

## 8. 有 intercept 時，OLS residual sum 為 0

來自：

$$
\sum e_i=0
$$

這是 Page 7 第一條 simplified equation。

---

# 考試 / 作業型問題速答

## Q1. What does least squares minimize?

It minimizes the sum of squared residuals:

$$
\sum_{i=1}^n(y_i-\hat y_i)^2
$$

## Q2. Why square the errors?

主要有兩個直覺：

1. 正負 residual 不會互相抵銷。
2. 大 error 會被更重懲罰。

## Q3. Why set partial derivatives equal to zero?

因為要找 loss function 的 stationary point；對 OLS quadratic objective，該條件給出 least-squares optimum。

## Q4. What are the normal equations?

$$
X^TX\beta=X^Ty
$$

它們來自 squared-error loss 對 parameters 的 first-order conditions。

## Q5. What is the closed-form OLS solution?

$$
\beta=(X^TX)^{-1}X^Ty
$$

在 $X^TX$ 可逆的理論情況下成立。

## Q6. Why does the design matrix include a column of ones?

用來產生 intercept term $\beta_0$。

## Q7. What is the geometric meaning of least squares?

$\hat y$ 是 $y$ orthogonally projected onto the column space of $X$；residual 與該 column space orthogonal。

## Q8. How does simple linear regression slope relate to covariance?

$$
\beta_1=\frac{Cov(X,Y)}{Var(X)}
$$

## Q9. Does the method extend to multiple predictors?

可以。把 $X$ 加更多 feature columns，matrix form 保持相同。

---

# 從這一課連到之後 Machine Learning 的脈絡

這一課最重要的價值，是它建立一個之後會反覆出現的框架：

```text
Model
  ↓
Prediction
  ↓
Loss Function
  ↓
Optimization
  ↓
Best Parameters
```

在 OLS：

- Model：Linear Regression
- Loss：Squared Error
- Optimization：Calculus + closed-form solution
- Parameters：$\beta$

之後 Neural Network 也是同一大框架，只是：

- model 更複雜
- parameters 多很多
- loss 可能不同
- 很難有 closed-form solution
- 因此通常用 gradient descent / backpropagation 逐步 optimization

所以 OLS 是理解更高階 machine learning optimization 的非常好起點。

---

# 最後 60 秒記憶版

只記這條故事：

1. Linear regression：
   $$\hat y=\beta_0+\beta_1x$$
2. Prediction 不會完全準，所以有 residual：
   $$e=y-\hat y$$
3. 不想正負互相抵銷，所以平方：
   $$e^2$$
4. 全部加起來形成 loss：
   $$L=\sum e^2$$
5. 找 loss 最低點：
   $$\partial L/\partial\beta_0=0,\quad\partial L/\partial\beta_1=0$$
6. 得到 normal equations。
7. 用 matrix 打包：
   $$X^TX\beta=X^Ty$$
8. 用 inverse 解：
   $$\boxed{\beta=(X^TX)^{-1}X^Ty}$$
9. 所以得到整體 squared residual 最少的 fitted line。

**一句話總結：**

> **Least Squares 就是把「哪條線最好」變成一個可以用 Calculus 和 Linear Algebra 精確解出的 optimization problem。**

## Connections

[[Supervised Learning MOC]] · [[Supervised Learning - Module 2 MOC]] · [[Fitting a Linear Model and Assessing Fit]]

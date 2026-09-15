---
course: Supervised Learning
module: 2
status: curated
tags:
  - supervised
  - module-2
  - prediction
  - regression
publish: true
---

# Simple Linear Regression Concepts

> [!info] Learning position
> Supervised Learning → Module 2 → Topic 7

## Simple_Linear_Regression_Concepts_完整筆記

# Simple Linear Regression Concepts — 完整筆記

> 課程：**Supervised Learning — Simple Linear Regression Concepts**  
> 主題：Simple Linear Regression 的定義、公式、係數解讀、Residual、Prediction、Inference、應用與限制

---

## 1. 這一課在學什麼？

這一課的核心是理解 **Simple Linear Regression（簡單線性回歸）**。

主要內容包括：

1. Simple Linear Regression 的定義與用途
2. 線性方程式與各部分的意思
3. Intercept（截距）與 Slope（斜率）的解讀
4. Regression Line（回歸線）的圖像理解
5. Error / Residual（誤差／殘差）
6. 用 Regression 做 Prediction（預測）
7. 用 Regression 做 Inference（推論／理解關係）
8. 實際應用
9. Simple Linear Regression 的限制

---

# 2. Linear Regression 是什麼？

Linear Regression 是一種 **Supervised Learning（監督式學習）** 方法。

它主要用來預測：

> **Continuous numerical outcome（連續數值結果）**

例如：

- 房屋面積 → 房價
- 讀書時間 → 考試分數
- 廣告支出 → 銷售額
- 經濟指標 → 股票報酬
- 藥物劑量 → 康復時間

---

## 2.1 Input 與 Output

Linear Regression 建模的是：

\[
X \rightarrow Y
\]

其中：

- \(X\) = Input / Feature / Predictor
- \(Y\) = Output / Response / Target

### 房價例子

\[
House\ Size \rightarrow House\ Price
\]

所以：

- \(X\) = House Size
- \(Y\) = House Price

---

# 3. Simple vs Multiple Linear Regression

## Simple Linear Regression

只有：

\[
1\ Input \rightarrow 1\ Output
\]

例如：

\[
House\ Size \rightarrow House\ Price
\]

---

## Multiple Linear Regression

有多個 input：

\[
Multiple\ Inputs \rightarrow 1\ Output
\]

例如：

\[
Size + Location + Bedrooms + Age \rightarrow House\ Price
\]

---

# 4. 為什麼叫 Linear？

因為模型嘗試用一條 **Straight Line（直線）** 去描述 \(X\) 和 \(Y\) 之間的關係。

例如：

```text
Price
  |
  |              •
  |           •
  |        •
  |      •
  |   •
  +---------------------- Size
```

模型希望找一條大致穿過資料中央的直線：

```text
Price
  |
  |               •
  |            • /
  |        •   /
  |      •   /
  |   •    /
  +---------------------- Size
```

重點不是：

> 所有點都一定落在線上。

而是：

> 找一條最能代表整體趨勢的線。

---

# 5. Motivating Example：House Prices

課程用房價作為主要例子。

問題：

> Can we predict house price from size?

設定：

- Input \(X\)：House size（square feet）
- Output \(Y\)：House price（dollars）
- 每一個 data point：一間曾經售出的房屋

整體趨勢通常是：

\[
House\ Size \uparrow \Rightarrow House\ Price \uparrow
\]

但資料點不會完全排成直線。

原因包括：

- Location
- Neighborhood
- House age
- Renovation
- Market condition
- Timing
- Bedrooms
- Other unmeasured factors

---

# 6. Simple Linear Regression 的核心公式

最重要公式：

\[
\boxed{Y = \beta_0 + \beta_1X + \epsilon}
\]

其中：

| 符號 | 名稱 | 意思 |
|---|---|---|
| \(Y\) | Target / Response | 真實結果 |
| \(X\) | Input / Feature | 輸入變數 |
| \(\beta_0\) | Intercept | 截距 |
| \(\beta_1\) | Slope | 斜率 |
| \(\epsilon\) | Error term | 真實但未知的誤差 |

---

# 7. \(Y\)：Target Variable

\(Y\) 是：

> 我們想要理解或預測的結果。

例如：

\[
Y = House\ Price
\]

其他例子：

- test score
- sales
- temperature
- stock return
- recovery time

---

# 8. \(X\)：Input Feature

\(X\) 是：

> 用來預測 \(Y\) 的輸入資料。

例如：

\[
X = House\ Size
\]

Simple Linear Regression 只有 **一個 \(X\)**。

---

# 9. \(\beta_0\)：Intercept

\[
\beta_0
\]

稱為：

> **Intercept（截距）**

意思：

> 當 \(X = 0\) 時，\(Y\) 的模型值。

例如模型：

\[
Price = 100,000 + 110(Size)
\]

這裡：

\[
\beta_0 = 100,000
\]

當：

\[
Size = 0
\]

模型給出：

\[
Price = 100,000
\]

---

## 9.1 Intercept 不一定有現實意義

0 square foot 的房屋通常沒有實際意義。

所以 \( \beta_0 \) 很多時候：

- 數學上需要
- 幫助定位 regression line
- 但不一定能直接做現實解讀

可以理解為：

> \(\beta_0\) 決定 regression line 在 Y 軸上的垂直位置。

---

# 10. \(\beta_1\)：Slope

\[
\beta_1
\]

稱為：

> **Slope（斜率）**

它表示：

> \(X\) 每增加 1 unit，\(Y\) 平均改變多少。

例如：

\[
\beta_1 = 110
\]

在房價例子：

> House Size 每增加 1 sq ft，預測房價增加 \$110。

---

## 10.1 Slope 例子

如果房屋從：

\[
1000 \rightarrow 1100\ sq\ ft
\]

增加：

\[
100\ sq\ ft
\]

每 sq ft 增加 \$110：

\[
100 \times 110 = 11,000
\]

所以預測價格增加：

\[
\$11,000
\]

---

# 11. Positive / Negative / Zero Slope

## Positive Slope

\[
\beta_1 > 0
\]

代表：

\[
X \uparrow \Rightarrow Y \uparrow
\]

例如：

\[
Study\ Hours \uparrow \Rightarrow Score \uparrow
\]

---

## Negative Slope

\[
\beta_1 < 0
\]

代表：

\[
X \uparrow \Rightarrow Y \downarrow
\]

---

## Zero Slope

\[
\beta_1 = 0
\]

代表：

> \(X\) 的改變不會造成 \(Y\) 的線性改變。

---

# 12. \(\epsilon\)：Error Term

完整模型：

\[
Y = \beta_0 + \beta_1X + \epsilon
\]

其中：

\[
\epsilon
\]

表示：

> 真實世界中模型沒有捕捉到、沒有測量到或無法控制的因素。

房價例子中，即使 Size 一樣，Price 還可能不同。

因為還有：

- Neighborhood
- Location
- Time of year
- Market conditions
- House condition
- Renovation
- Age
- Other factors

所以：

\[
Y \neq \beta_0 + \beta_1X
\]

通常更接近：

\[
Y = \beta_0 + \beta_1X + \epsilon
\]

---

# 13. 真實模型 vs 預測模型

這是非常重要的一個區分。

---

## 13.1 真實模型

\[
\boxed{Y = \beta_0 + \beta_1X + \epsilon}
\]

代表：

> 真實世界中的關係。

其中：

- \(\beta_0\)、\(\beta_1\) 是真正的參數
- \(\epsilon\) 是真正但未知的 error

但現實中：

> 我們不知道真正的 \(\beta_0\)、\(\beta_1\)。

---

## 13.2 預測／估計模型

我們用 sample data 去估計參數：

\[
\hat{\beta}_0,\hat{\beta}_1
\]

所以得到：

\[
\boxed{\hat Y = \hat{\beta}_0 + \hat{\beta}_1X}
\]

其中：

- \(\hat Y\) = Predicted Y
- \(\hat{\beta}_0\) = Estimated Intercept
- \(\hat{\beta}_1\) = Estimated Slope

---

## 13.3 「帽子」代表什麼？

符號：

\[
\hat{}
\]

可以記成：

> estimated / predicted

例如：

| 符號 | 意思 |
|---|---|
| \(Y\) | Actual / true observed value |
| \(\hat Y\) | Predicted value |
| \(\beta_0\) | True intercept |
| \(\hat{\beta}_0\) | Estimated intercept |
| \(\beta_1\) | True slope |
| \(\hat{\beta}_1\) | Estimated slope |

---

# 14. 房價預測例子

假設 fitted model 是：

\[
\hat{Price} = 100,000 + 110(Size)
\]

---

## 14.1 1300 sq ft

\[
Size = 1300
\]

代入：

\[
\hat{Price} = 100,000 + 110(1300)
\]

\[
=100,000+143,000
\]

\[
\boxed{\hat{Price}=243,000}
\]

所以：

> 預測房價 = \$243,000

---

## 14.2 1800 sq ft

\[
\hat{Price}=100,000+110(1800)
\]

\[
=100,000+198,000
\]

\[
\boxed{\hat{Price}=298,000}
\]

---

# 15. Residual 是什麼？

Residual：

\[
\boxed{e = Y - \hat Y}
\]

意思是：

> Actual − Predicted

也就是：

> 模型實際預測錯了多少。

---

# 16. Residual 圖像理解

在 regression graph 裡：

- 藍點 = Actual Y
- Regression Line = Predicted values
- 點與線之間的垂直距離 = Residual

```text
Price
  |
  |          ● Actual Y
  |          │
  |          │ Residual
  |----------×------------ Regression line
             Ŷ
  |
  +----------------------------- X
```

因此：

\[
Residual = Actual - Prediction
\]

---

# 17. Positive Residual

假設：

\[
Y = 250,000
\]

\[
\hat Y = 243,000
\]

則：

\[
e=250,000-243,000
\]

\[
\boxed{e=+7,000}
\]

代表：

> Actual > Predicted

模型：

> **低估（under-predict）\$7,000**

---

# 18. Negative Residual

假設：

\[
Y = 235,000
\]

\[
\hat Y = 243,000
\]

則：

\[
e=235,000-243,000
\]

\[
\boxed{e=-8,000}
\]

代表：

> Actual < Predicted

模型：

> **高估（over-predict）\$8,000**

---

# 19. Error \(\epsilon\) vs Residual \(e\)

這兩個概念很相似，但正式上不同。

---

## Error Term

\[
\epsilon
\]

屬於真實模型：

\[
Y=\beta_0+\beta_1X+\epsilon
\]

它是：

> 真實但未知的誤差。

---

## Residual

\[
e
\]

由資料計算：

\[
e=Y-\hat Y
\]

它是：

> 我們觀察到的 Actual 與 fitted model prediction 的差。

---

## 快速對照

| 項目 | Error | Residual |
|---|---|---|
| 符號 | \(\epsilon\) | \(e\) |
| 所屬 | True model | Fitted model |
| 可直接觀察？ | 不可 | 可以計算 |
| 公式 | 理論誤差 | \(Y-\hat Y\) |

簡單記：

> **\(\epsilon\) 是理論上的真實 error；\(e\) 是我們從 sample 看到的 residual。**

---

# 20. Prediction 是什麼？

Linear Regression 的其中一個主要用途：

> **Predict new values of Y from new X.**

流程：

```text
Historical Data
      ↓
Learn β̂₀ and β̂₁
      ↓
Build fitted regression model
      ↓
Input new X
      ↓
Predict Ŷ
```

例如：

```text
Historical house data
        ↓
Learn:
Price = 100,000 + 110(Size)
        ↓
New house = 1300 sq ft
        ↓
Predicted price = $243,000
```

---

# 21. Inference 是什麼？

Regression 不只是預測。

它亦可以幫助我們：

> **Understand relationships in data**

Inference 可以看：

1. Direction
2. Magnitude
3. Practical meaning

---

# 22. Direction

看：

\[
\beta_1
\]

如果：

\[
\beta_1 > 0
\]

代表：

> X 和 Y 同方向。

如果：

\[
\beta_1 < 0
\]

代表：

> X 和 Y 反方向。

---

# 23. Magnitude

看：

\[
|\beta_1|
\]

課程的解讀是：

- \(|\beta_1|\) larger → effect larger
- \(|\beta_1|\) smaller → effect smaller

例如：

\[
\$110 / sq\ ft
\]

vs

\[
\$300 / sq\ ft
\]

在同一單位與情境下，\$300/sq ft 代表更大的變化量。

---

# 24. Practical Meaning

不只是看數學。

例如：

\[
\beta_1=110
\]

真正 domain meaning 是：

> 每多一平方呎，房屋預測價值增加約 \$110。

所以 Linear Regression 的優點之一是：

> **Interpretability 很高。**

---

# 25. Prediction vs Inference

| Prediction | Inference |
|---|---|
| 預測新的 Y | 理解 X 和 Y 關係 |
| 重點是準確度 | 重點是解讀 |
| 「這間房值多少？」 | 「多 1 sq ft 影響多少？」 |
| 看 \(\hat Y\) | 看 \(\beta_1\) |

簡單記：

> **Prediction = Y 是多少？**

> **Inference = X 如何影響 Y？**

---

# 26. Regression Line 是什麼？

Regression line 代表模型給出的 predicted values：

\[
\hat Y = \hat\beta_0+\hat\beta_1X
\]

每一個 X 都對應 regression line 上一個 predicted Y。

例如：

```text
Actual data        ●
                  │
                  │ residual
Regression line --×----------------
                  Ŷ
```

---

# 27. Best-Fitting Line 的概念

課程強調：

> Linear regression 的核心是找到一條 best-fitting line，描述 X 與 Y 的關係。

這條線不是：

- 一定穿過所有 points
- 完美預測所有 data

而是：

> 整體而言最能代表資料 relationship 的直線。

後續課程通常會進一步學：

- Least Squares
- Sum of Squared Errors
- MSE
- RMSE

來正式定義「best-fitting」。

---

# 28. Residual 和 MSE / RMSE 的關係

Residual：

\[
e_i=Y_i-\hat Y_i
\]

每一個 observation 都有一個 residual。

下一步可以平方：

\[
e_i^2
\]

避免正負 error 互相抵消。

---

## MSE

\[
\boxed{
MSE=\frac{1}{n}\sum_{i=1}^{n}(Y_i-\hat Y_i)^2
}
\]

即：

> Mean Squared Error

平均平方誤差。

---

## RMSE

\[
\boxed{
RMSE=\sqrt{MSE}
}
\]

好處：

> 單位重新變回原本 Y 的單位。

例如：

House Price 是 dollar：

- MSE 單位 = dollar²
- RMSE 單位 = dollar

---

## 整條邏輯

```text
Actual Y
    ↓
Predicted Ŷ
    ↓
Residual e = Y − Ŷ
    ↓
Square residual e²
    ↓
Average
    ↓
MSE
    ↓
Square root
    ↓
RMSE
```

---

# 29. Linear Regression 的實際應用

課程列出多個 domain。

---

## Finance

例如：

> 用 economic indicators 預測 stock returns。

\[
Economic\ Indicators \rightarrow Stock\ Returns
\]

---

## Healthcare

例如：

> 用 treatment dosage 預測 recovery time。

\[
Dosage \rightarrow Recovery\ Time
\]

---

## Education

例如：

> 用 study hours 預測 test score。

\[
Study\ Hours \rightarrow Test\ Score
\]

---

## Marketing

例如：

> 用 advertising spend 預測 sales。

\[
Advertising\ Spend \rightarrow Sales
\]

---

## Environmental Science

例如：

> Modeling temperature changes over time.

\[
Time \rightarrow Temperature
\]

---

# 30. Simple Linear Regression 的限制

這部分是課程的另一個重點。

---

## Limitation 1：Assumes a Linear Relationship

Simple Linear Regression 假設：

\[
X \text{ 與 } Y
\]

的關係大致可以用一條直線表示。

但現實資料可能是：

- curve
- U-shape
- exponential
- threshold effect
- other nonlinear patterns

例如：

\[
Y=X^2
\]

就是 nonlinear。

---

## Limitation 2：Only One Predictor

Simple Linear Regression 只有：

\[
1X
\]

但大多數現實結果受到多個因素影響。

例如房價：

\[
Price=f(Size, Location, Age, Bedrooms, Condition,\dots)
\]

只用 Size 很容易不夠。

---

## Limitation 3：Limited Predictive Power

只有一個 feature 時：

> 大量 Y 的 variation 可能沒有被解釋。

因此：

- residual 可能較大
- prediction 可能不夠準確

---

## Limitation 4：Cannot Capture Interactions

Interaction 意思：

> 一個 variable 的 effect 會因另一個 variable 而改變。

例如：

Size 對 Price 的影響可能取決於 Location。

Downtown：

\[
+1 sq\ ft \rightarrow +\$500
\]

其他地區：

\[
+1 sq\ ft \rightarrow +\$100
\]

即：

\[
Size \times Location
\]

存在 interaction。

Simple Linear Regression 無法表示這種多變量 interaction。

---

## Limitation 5：Assumes Constant Variance

課程指出：

> Error variance 應在 X 的不同範圍大致保持一致。

這種情況叫：

> **Homoscedasticity**

例如：

```text
Y
|        •
|      •  •
|    • •
|  •  •
+---------------- X
```

資料散布程度差不多。

---

## 非 Constant Variance

如果 X 越大，error spread 越大：

```text
Y
|                    •
|              •          •
|          •       •
|      •
|   •
+--------------------------- X
```

這通常稱為：

> **Heteroscedasticity**

課程用房價例子指出：

> 大型房屋的價格 variability 可能比小型房屋更大。

---

# 31. 一張總流程圖

```text
SUPERVISED LEARNING
        │
        ↓
    REGRESSION
        │
        ↓
Continuous Target Y
        │
        ↓
SIMPLE LINEAR REGRESSION
        │
        ↓
1 Input X → 1 Output Y
        │
        ↓
True Model:
Y = β₀ + β₁X + ε
        │
        ↓
Use historical data
to estimate parameters
        │
        ↓
Estimated Model:
Ŷ = β̂₀ + β̂₁X
        │
        ↓
Prediction Ŷ
        │
        ↓
Compare with Actual Y
        │
        ↓
Residual:
e = Y − Ŷ
        │
        ↓
e²
        │
        ↓
MSE
        │
        ↓
RMSE
```

---

# 32. 最重要三條公式

## 真實模型

\[
\boxed{
Y=\beta_0+\beta_1X+\epsilon
}
\]

---

## 預測模型

\[
\boxed{
\hat Y=\hat\beta_0+\hat\beta_1X
}
\]

---

## Residual

\[
\boxed{
e=Y-\hat Y
}
\]

---

# 33. 最重要符號表

| Symbol | English | 中文／意思 |
|---|---|---|
| \(X\) | Feature / Predictor | 輸入變數 |
| \(Y\) | Target / Response | 真實結果 |
| \(\hat Y\) | Predicted Y | 預測結果 |
| \(\beta_0\) | True Intercept | 真實截距 |
| \(\beta_1\) | True Slope | 真實斜率 |
| \(\hat\beta_0\) | Estimated Intercept | 估計截距 |
| \(\hat\beta_1\) | Estimated Slope | 估計斜率 |
| \(\epsilon\) | Error Term | 真實但未知的誤差 |
| \(e\) | Residual | Actual − Predicted |

---

# 34. 最容易混淆的地方

## ① \(Y\) vs \(\hat Y\)

\[
Y = Actual
\]

\[
\hat Y = Prediction
\]

---

## ② \(\beta\) vs \(\hat\beta\)

\[
\beta
\]

代表真正但未知的 population parameter。

\[
\hat\beta
\]

代表用 sample data 估計出來的 parameter。

---

## ③ \(\epsilon\) vs \(e\)

\[
\epsilon
\]

是真實 error。

\[
e
\]

是 sample 中算出來的 residual。

---

## ④ Positive residual

\[
e>0
\]

代表：

\[
Y>\hat Y
\]

模型低估。

---

## ⑤ Negative residual

\[
e<0
\]

代表：

\[
Y<\hat Y
\]

模型高估。

---

# 35. 超簡單記憶法

### 真實世界

\[
Y=\beta_0+\beta_1X+\epsilon
\]

> 真實結果 = 線性關係 + 無法解釋部分

---

### 模型世界

\[
\hat Y=\hat\beta_0+\hat\beta_1X
\]

> 用資料估計一條線去預測

---

### 預測錯多少

\[
e=Y-\hat Y
\]

> 真實值 − 預測值

---

# 36. House Price 完整例子

假設：

\[
\hat{Price}=100,000+110(Size)
\]

新房：

\[
Size=1300
\]

模型預測：

\[
\hat Y=243,000
\]

假設真實售價：

\[
Y=250,000
\]

Residual：

\[
e=250,000-243,000
\]

\[
e=7,000
\]

所以：

- Actual = \$250,000
- Predicted = \$243,000
- Residual = +\$7,000
- 模型低估 \$7,000

---

# 37. 與前面 Machine Learning 內容的連接

```text
Supervised Learning
        ↓
Regression
        ↓
Continuous target
        ↓
Linear Regression
        ↓
Fit model on training data
        ↓
Predict on new/test data
        ↓
Actual − Prediction
        ↓
Residual
        ↓
MSE / RMSE
        ↓
Evaluate model accuracy
```

因此之前學過的：

```python
LinearRegression()
```

就是在 fitted model 中估計：

\[
\hat\beta_0,\hat\beta_1
\]

而：

```python
model.predict(X_test)
```

得到：

\[
\hat Y
\]

之後：

```python
mean_squared_error(y_test, y_pred)
```

就是利用：

\[
Y-\hat Y
\]

衡量預測誤差。

---

# 38. 考試／Quiz 快速重點

需要能回答：

### Q1. What is simple linear regression?

A supervised learning method that uses one input variable to predict a continuous output variable with a linear relationship.

---

### Q2. Formula?

\[
Y=\beta_0+\beta_1X+\epsilon
\]

---

### Q3. What is \(\beta_0\)?

Intercept：

> Expected Y when X = 0.

---

### Q4. What is \(\beta_1\)?

Slope：

> Change in Y associated with a one-unit increase in X.

---

### Q5. What is \(\epsilon\)?

Error term：

> Variation not captured by the linear relationship.

---

### Q6. What is \(\hat Y\)?

Predicted value of Y.

---

### Q7. Residual formula?

\[
e=Y-\hat Y
\]

---

### Q8. Positive residual means?

\[
Y>\hat Y
\]

模型低估。

---

### Q9. Negative residual means?

\[
Y<\hat Y
\]

模型高估。

---

### Q10. Prediction vs inference?

- Prediction：估計新的 Y
- Inference：理解 X 與 Y 的 relationship

---

### Q11. Main limitation?

Simple Linear Regression：

- assumes linear relationship
- uses only one predictor
- may have limited predictive power
- cannot capture interactions
- assumes constant error variance

---

# 39. 最終一句話總結

> **Simple Linear Regression 使用歷史資料估計一條最適合的直線 \(\hat Y=\hat\beta_0+\hat\beta_1X\)，用一個輸入 \(X\) 預測連續結果 \(Y\)，並利用 Residual \(e=Y-\hat Y\) 衡量模型預測與真實值之間的差距。**

---

# 40. 核心卡片

```text
TRUE MODEL
Y = β₀ + β₁X + ε
      ↓
真實世界的關係
      ↓
用資料估計 β₀、β₁
      ↓
PREDICTED MODEL
Ŷ = β̂₀ + β̂₁X
      ↓
得到 Prediction
      ↓
與 Actual Y 比較
      ↓
RESIDUAL
e = Y − Ŷ
      ↓
e² → MSE → RMSE
```

---

## Source

Based on the uploaded **Simple Linear Regression Concepts** lecture PDF and transcript by Daniel E. Acuna, University of Colorado Boulder.

## SLR_Concepts_全文詳解與QA

# Simple Linear Regression Concepts — 全文詳解 + Q&A

> 來源對讀  
> - PDF：`Simple Linear Regression Concepts.pdf`（13 頁）  
> - TXT / 影片：`Simple Linear Regression Concepts.txt` + `240P Simple Linear Regression Concepts .mp4`  
> - 舊筆記：`Simple_Linear_Regression_Concepts_完整筆記.md`  
> - 對照教科書：ISLP Ch.3 開頭（本課不到估 β、R²、假設檢定）  
> - 上一課：Regression vs Classification

鎖定數字（一律跟 PDF）：

\[
\beta_0 = 100{,}000,\quad \beta_1 = 110
\]

\[
\widehat{\text{Price}} = 100{,}000 + 110 \times \text{Size}
\]

- 1,300 sq ft → **$243,000**
- 1,800 sq ft → **$298,000**
- 1,000 → 1,100 sq ft：價格升 **$11,000**（= 100 × 110）
- 圖上殘差標註：約 800 sq ft 為 **+ $9k**；約 1,200 sq ft 為 **+$30k**；約 1,800 sq ft 為 **− $9k**

---

## Grok ALIGN（本課決策）

**ALIGN**  
p.3 定義 SLR/MLR → p.4 房價散佈 → p.5 公式 \(Y=\beta_0+\beta_1 X+\varepsilon\) → p.6 視覺（投影片幾乎空，內容在影片）→ p.7 係數解讀 → p.8 殘差圖 → p.9 預測兩間新房 → p.10 inference：方向/強度/實務意義 → p.11 跨領域 → p.12 限制 → p.13 回顧。

**TXT-ONLY / 影片才講清楚**  
- 「linear」在高維是 hyperplane  
- \(\beta_0\)：零坪房屋不真實，但數學上必要  
- 斜率 110 vs 300：都市地段空間更貴  
- 殘差來源：社區、季節、市場、沒量到的變數  
- ML 一句話：從過去學，用到未來新房子  
- 影片口頭講出 homoscedasticity 這個詞（投影片只寫 constant variance）

**PDF-ONLY**  
- p.9 兩個預測的完整算式  
- p.10 把 inference 拆成 Direction / Magnitude / Practical meaning  
- p.12 五條限制並列  
- p.8 圖上 +9k / +30k / −9k（TXT 只清楚講到 ±9k）

**CONFLICTS / 口誤**（正文跟 PDF）

| 來源 | 說了什麼 | 裁決 |
|---|---|---|
| 影片 ~4:17 | 「The slope, **b0**, represents how much the price increases」 | 口誤，是 **β₁** |
| TXT | 「The model **can** capture interactions」 | ASR 漏否定。影片與 PDF 都是 **won't** |
| TXT | homoestheticity | **homoscedasticity** |
| 影片 | 某點「值 300k，少 9k」 | 與 p.8 的 −9k 同一類例子，不另造數字 |
| 上堂 RVC | error = Pred − Actual | 本課圖：點在線上為正 → **ε ≈ Y − Ŷ** |

**ISLP**  
Ch.3.1–3.2 同模型；本課**不教**如何估 \(\hat\beta\)、SE、t、R²。那些留給 OLS 那課。

**FIGS-P0**  
SLR01 監督式→迴歸→SLR vs MLR  
SLR02 房價散佈 + 線  
SLR03 標 \(\beta_0,\beta_1\)（1000→1100 升 11k）  
SLR04 殘差 +9k / +30k / −9k，註明 ε = Y−Ŷ  
SLR05 代入 1300、1800  
SLR06 限制五塊（線性 / 單變數 / 交互 / 預測力 / 等變異）

---

# 0. 一句話 + 學習目標

Simple Linear Regression 用**一條直線**描述「一個連續 X」和「一個連續 Y」的關係：既拿來**預測新點**，也拿來**讀出關係的方向與強度**。

學完應能：

1. 判斷這是 SLR 而不是分類、也不是多元迴歸  
2. 逐項解釋 \(Y=\beta_0+\beta_1 X+\varepsilon\)  
3. 讀 \(\beta_0,\beta_1\)（含「截距常沒有真實意義」）  
4. 在圖上指出殘差，並說出正負代表高估還是低估  
5. 代入新 X 做預測  
6. 說出本模型五條限制，並接到下一課（OLS）要解決「線怎麼找」

---

# 1. 在監督式地圖的位置

上一課：有標籤的預測分兩種——**迴歸（連續數字）** vs **分類（類別）**。  
本課：迴歸裡最簡單的一種——**只有一個 X**，而且關係被假設成直線。

```text
監督式學習
 └─ 迴歸（連續 Y）          ← 上一課
     ├─ Simple LR：1 個 X   ← 本課
     └─ Multiple LR：多個 X  ← 點到為止
 └─ 分類                    ← 本課不做
```

[PDF p.3] Linear regression = 監督式、預測連續結果。  
Simple：1 input → 1 output。Multiple：多 input → 1 output。

[TXT] 「linear」指擬合直線；維度變高時是 **hyperplane**。本課只畫 2D 直線。

連到舊課：上一課的房價、考試分數、航班分鐘都是迴歸任務。本課把「房價」收成正式模型。

---

# 2. 逐段詳解

## 2.1 為什麼需要這條線？[PDF p.4 + 影片]

資料：每間已售屋一個點  
- \(X\) = 坪數（sq ft）  
- \(Y\) = 成交價（美元）

肉眼：大房子通常較貴，但點不在一條線上。  
老師的話：點「more or less around the line；on average they align」。

所以模型不是「每個點都落在線上」，而是「一條代表平均趨勢的線」。離線的距離就是後面的 \(\varepsilon\)。

## 2.2 公式 [PDF p.5]

\[
Y = \beta_0 + \beta_1 X + \varepsilon
\]

| 符號 | 角色 | 本課房價 |
|---|---|---|
| \(Y\) | 真實目標 | 實際成交價 |
| \(X\) | 唯一輸入 | 面積 |
| \(\beta_0\) | 截距，\(X=0\) 時的 \(Y\) | $100,000 |
| \(\beta_1\) | 斜率，\(X\) 多 1 單位時 \(Y\) 變多少 | $110 / sq ft |
| \(\varepsilon\) | 線解釋不了的部分 | 沒量到的因素 + 噪音 |

兩種「線」不要混：

- **母體模型**（本課公式）：真實世界裡有一條未知的 \(\beta_0+\beta_1 X\)，再加上 \(\varepsilon\)
- **已擬合線**（p.9）：我們用資料得到  
  \(\widehat{\text{Price}}=100{,}000+110\times\text{Size}\)  
  預測時通常**不加** \(\varepsilon\)，因為未來那一筆的誤差無法事先知道

[TXT] \(\varepsilon\)：「cannot be predicted… things we haven't measured or that are out of our grasp。」

## 2.3 截距與斜率 [PDF p.7 + 影片]

**\(\beta_0=\$100{,}000\)**  
- 定義：面積 = 0 時的預測價  
- 老師多次強調：**not realistic, but mathematically necessary**  
- 功能：把線在縱軸上定位  
- 解讀時不要說「沒有房子也值 10 萬」——那是直線外推到資料沒有的區域

**\(\beta_1=\$110\)**  
- 面積多 1 sq ft，預測價多 $110  
- 影片用 1,000 → 1,100 sq ft：多 100 ft × 110 = **$11,000**  
- \(\beta_1>0\)：X 與 Y 同向；\( <0\) 反向；\(=0\) 無關  
- \(|\beta_1|\) 大：同樣一單位 X，Y 動得比較多（影片：110 vs 300，後者像高價市區）

注意：本課把「斜率比較大」講成「影響比較強」。這在**同一單位、同一 Y** 時合理。單位一換（用 m² 而非 sq ft），數字會變，不能跨單位比大小。這點標成〔延伸〕，課件沒講。

## 2.4 殘差圖 [PDF p.8 + 影片]

藍點 = 真實房屋；橘線 = 擬合線。  
垂直距離 = 這筆的誤差。

圖上三個標註：

| 約略 X | 圖上 ε | 意思（本課符號） |
|---|---|---|
| ~800 sq ft | +$9k | 實際比線**高** 9k |
| ~1,200 sq ft | +$30k | 實際比線**高** 30k |
| ~1,800 sq ft | −$9k | 實際比線**低** 9k（線高估） |

本課圖的習慣：

\[
\varepsilon \approx Y - \hat Y
\quad\text{（實際 − 預測）}
\]

- 正：低估實際成交價  
- 負：高估（老師：「sometimes we are overpricing」）

影片講 800 sq ft 那點 off by $9,000，與圖 +9k 一致。  
另一點老師說「以為約 300k，其實少 9k」→ 對應圖上負殘差那類。

殘差從哪來：[TXT] neighborhood、季節、市場、測量不精的面積……也就是「單一 X 解釋不完」。

## 2.5 預測 [PDF p.9]

模型已學到：

\[
\widehat{\text{Price}} = 100{,}000 + 110 \times \text{Size}
\]

新房子 1,300 sq ft：

\[
100{,}000 + 110\times 1{,}300 = 100{,}000 + 143{,}000 = 243{,}000
\]

新房子 1,800 sq ft：

\[
100{,}000 + 110\times 1{,}800 = 100{,}000 + 198{,}000 = 298{,}000
\]

[TXT] 「We learn from the past, and what we learn we can apply for the future.」  
這就是監督式：用**已成交**的 \((X,Y)\) 學線，對**還沒賣、只有 X** 的房子出 \(\hat Y\)。

預測給的是線上的點，不是保證成交價。真實成交 = 預測 + 未來那筆未知的 \(\varepsilon\)。

## 2.6 Inference [PDF p.10]

本課的 inference **不是** p-value / 信賴區間（那是後課）。這裡是：

1. **Direction**：\(\beta_1\) 正或負  
2. **Magnitude**：\(|\beta_1|\) 大或小  
3. **Practical meaning**：這 110 塊錢在房市代表「每一平方英尺的空間值多少」

影片補充：不同城市可以比斜率——空間更貴的市場斜率更陡。

連到上一課「interpretability」線索：SLR 的賣點就是係數能用一句人話講完。這也是 p.12 願意忍受「預測力有限」的原因。

## 2.7 應用 [PDF p.11]

同一條原則：找最能描述 \(X\)–\(Y\) 的線。

- 金融：經濟指標 → 報酬  
- 醫療：劑量 / 復健時數 → 康復時間  
- 教育：讀書時數 → 分數（上一課 quiz 的迴歸題）  
- 行銷：廣告支出 → 銷售（ISLP Advertising 以後會用）  
- 環境：時間 → 溫度  

## 2.8 限制 [PDF p.12 + 影片]

| 限制 | 人話 | 後面哪課接 |
|---|---|---|
| 假設線性 | 真關係可能是彎的 | 更複雜模型 / 殘差圖診斷（OLS 課） |
| 只有一個 X | 房價還有地段、屋齡、房數 | Multiple regression |
| 預測力有限 | 單一特徵 → 殘差大、很多變異沒被解釋 | R²、Bias–Variance |
| 沒有交互作用 | 「面積的價值」可能依社區而變 | 交互項、樹模型 |
| 誤差變異固定 | 大房子價差可能比較大（影片：homoscedasticity） | 殘差 vs X 圖 |

影片多講的詞：**homoscedasticity** = 誤差變異不隨 X 變。違反時叫 heteroscedasticity。本課只需要認得「大房子誤差可能比較散」。

---

# 3. 影片有、投影片沒展開的補充

1. p.6 幾乎是空白標題頁；\(\beta_0/\beta_1\) 的動畫全在影片：線過 y 軸、1000→1100 的粉紅增量。  
2. 零坪房屋「數學必要、現實荒謬」講了兩次——解讀截距的標準警告。  
3. 殘差可正可負；負 = 高估。  
4. 預測 vs inference 被說成機器學習的兩個目的：future values vs understand the data。  
5. 限制段口頭補了 homoscedasticity 與「彎曲關係」。

---

# 4. 與前後課融會

**接上一課 Regression vs Classification**  
- 任務類型：房價是連續數字 → 迴歸，不是分類。  
- 上一課指標是 MAE/MSE/RMSE（愈低愈好）。本課的 \(\varepsilon\) 平方加總，下一課 OLS 就是在**最小化那些平方誤差**。  
- 符號衝突必須記：

| 課 | error 定義 | 點在線上方 |
|---|---|---|
| RVC 表 / TXT | Pred − Actual | 負（預測較高？不，Pred−Actual 在實際較高時為負） |
| 本課圖 | Y − Ŷ = Actual − Pred | **正** |

討論「高估/低估」時先講定義；討論 MSE 時平方後相同。

**接到 OLS / R² 課**  
本課假設線已經在那裡（100000 + 110×size）。下一課才問：這兩個數字從哪來？答案是最小化 SSE。R² 則回答 p.12「unexplained variation」有多少。

**接到 Bias–Variance**  
「只有一個 X、線太直」→ 可能高 bias；以後加很多項 → 低 bias 高 variance。本課只種因。

**接到 Interpretability**  
SLR 幾乎是可解釋性的上限：一個斜率一句話。用樹或神經網路換預測力時，這句話會消失。

**數學底**  
- 直線：\(y=b+mx\)（微積分 / 高中）  
- 以後矩陣：\(Y=X\beta+\varepsilon\)（線性代數）  
- \(\varepsilon\) 當隨機：機率課

---

# 5. ISLP 對照（callout）

ISLP 3.1 寫的也是 \(Y=\beta_0+\beta_1 X+\varepsilon\)，並把 \(\varepsilon\) 稱為不可約誤差的來源之一。  
本課停在「公式 + 解讀 + 預測代入」。  
ISLP 接著會做：最小平方估計、標準誤、信賴區間、假設檢定、R²。那些**不要寫進本課正文當已教內容**。

---

# 6. 常見混淆

1. 把 \(\beta_0\) 講成「一定有意義的底價」——課件說 often not literally meaningful。  
2. 把 \(\beta_1=110\) 講成「相關很強」——沒有標準化、沒有 R²，只是單位增量。  
3. 以為預測 243,000 會準確成交——漏掉 \(\varepsilon\)。  
4. 把 SLR 當分類器（把房價切成貴/便宜才是分類）。  
5. 把 ε 的正負跟上一課 Pred−Actual 混用。  
6. 聽到影片「slope b0」寫進筆記——那是口誤。  
7. 從 TXT 抄「model can capture interactions」——錯，是 **can't**。

---

# 7. Q&A

### Q1（定義）
Simple 和 Multiple linear regression 差在哪？  
**A：** Simple = 1 個 X → 1 個連續 Y。Multiple = 多個 X → 1 個連續 Y。都是迴歸，不是分類。  
**Trap：** 以為 simple 代表「公式比較簡單所以準」。Simple 只指變數個數。  
**Source：** PDF p.3

### Q2（公式）
寫出本課模型，並用一句話解釋每一項。  
**A：** \(Y=\beta_0+\beta_1 X+\varepsilon\)。Y 真價、X 面積、β₀ 零面積時的線高、β₁ 每多 1 sq ft 線上移多少、ε 線解釋不了的部分。  
**Source：** PDF p.5

### Q3（截距）
β₀ = 100,000 能不能解釋成「沒有房子也值十萬」？  
**A：** 數學上是 X=0 的 Y；實務上零坪不存在，課件寫 often not literally meaningful。它主要在定位線的高度。  
**Source：** PDF p.7，影片重複兩次

### Q4（斜率計算）
面積從 1,000 增到 1,100，預測價變多少？  
**A：** \(\Delta X=100\)，\(\Delta\hat Y=100\times 110=11{,}000\)。  
**Source：** 影片；與 p.7 的 β₁=110 一致

### Q5（預測，必算）
模型 Price = 100,000 + 110 × Size。1,300 與 1,800 sq ft 的預測？  
**A：** 243,000 與 298,000。  
步驟：110×1300=143,000，+100,000=243,000；110×1800=198,000，+100,000=298,000。  
**Trap：** 把 110 當成 110,000；或漏加截距。  
**Source：** PDF p.9

### Q6（殘差符號）
點在線**上方**，本課圖的 ε 是正還是負？代表高估還是低估？  
**A：** 正（Y−Ŷ>0）。模型**低估**實際成交價。  
**Trap：** 用上一課 Pred−Actual，會把答案反過來。  
**Source：** PDF p.8（+9k、+30k 都在線上方）

### Q7（負殘差）
老師說「overpricing」對應哪種 ε？  
**A：** 負殘差：預測高於實際。  
**Source：** 影片 + PDF p.8 的 −9k

### Q8（prediction vs inference）
同樣一條線，預測和本課所謂 inference 差在哪？  
**A：** 預測：代入新 X 得到 \(\hat Y\)。Inference：讀 β₁ 的正負與大小，理解「X 怎麼連到 Y」（本課還沒做統計檢定）。  
**Source：** PDF p.9–10

### Q9（限制）
為什麼「面積對房價的效果依社區而變」是 SLR 做不到的？  
**A：** 那是 **interaction**。SLR 只有一個斜率，假設面積的 $110 到處相同。  
**Trap：** TXT 有一句漏了 won't，不要抄成「可以捕捉交互」。  
**Source：** PDF p.12、影片

### Q10（等變異）
大房子價格比較散，違反本課哪條假設？  
**A：** 誤差變異隨 X 改變，違反 constant variance / homoscedasticity。  
**Source：** PDF p.12、影片

### Q11（融會：任務類型）
「預測這間房會不會賣超過 25 萬」是迴歸還是分類？和本課有何不同？  
**A：** 分類（過/不過是類別）。本課預測的是金額本身。同一批資料可以做成兩種任務，輸出型態決定任務。  
**Link：** Regression vs Classification p.18–19

### Q12（融會：下一課）
本課的 100,000 和 110 是怎麼來的？  
**A：** 本課直接給已擬合數字。下一課 OLS：選讓殘差平方和最小的 \(\beta_0,\beta_1\)。  
**Link：** Fitting Linear Model / OLS / R²

### Q13（錯因 / 口誤）
影片說「the slope, b0」。筆記該寫誰？  
**A：** β₁。b0/β₀ 是截距。  
**Source：** 影片口誤 vs PDF p.5, p.7

### Q14（概念對立）
β₁ 很大是否表示模型很準？  
**A：** 不一定。β₁ 大只表示 X 一單位對應 Y 變很多。準不準看殘差 / MSE / 以後的 R²。斜率陡的線仍可 residual 很大。  
**Link：** RVC 的 MSE；OLS 的 R²

### Q15（邊界）
讀書時數 → 分數 0–100，為什麼仍用本課這種迴歸，而不是分類？  
**A：** 輸出是可比較大小的數字，錯 90 vs 80 比錯 90 vs 89 更嚴重。上一課老師用「能量化 wrong 的 magnitude」判成迴歸。  
**Link：** RVC 練習題 1

---

# 8. 圖說（給 Codex）

- **SLR01** 地圖：監督式 → 迴歸 → SLR / MLR  
- **SLR02** 散佈 + 線，軸：House Size (sq ft)、Price ($)  
- **SLR03** 同一條線標 β₀（虛線到 y 軸，註「X=0 常無實義」）與 β₁（1000→1100 的 +11k）  
- **SLR04** 三條垂直殘差 +9k / +30k / −9k，圖例寫 ε = Y − Ŷ  
- **SLR05** 垂直虛線在 1300、1800，標 243k、298k  
- **SLR06** 五張限制卡

數字不得改。

---

# 9. 本課驗收

- [x] 公式、100k、110、243k、298k 與 PDF 一致  
- [x] 殘差符號與 p.8 圖一致，並對上堂 Pred−Actual 做對照  
- [x] 影片口誤 β₀/β₁、TXT 漏 won't、homoscedasticity 已標  
- [x] 不把 OLS / R² / p-value 寫成「本課已教」  
- [x] Q&A 含計算、符號、限制、融會、口誤

## Connections

[[Supervised Learning MOC]] · [[Supervised Learning - Module 2 MOC]] · [[Regression Assumptions and Diagnostics]]

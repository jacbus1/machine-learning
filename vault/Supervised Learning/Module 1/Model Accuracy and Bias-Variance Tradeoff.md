---
course: Supervised Learning
module: 1
status: curated
tags:
  - supervised
  - module-1
  - machine-learning
publish: true
---

# Model Accuracy and Bias-Variance Tradeoff

> [!info] Learning position
> Supervised Learning → Module 1 → Topic 7

## Model_Accuracy_Bias_Variance_Tradeoff_完整詳細整理

Model Accuracy andBias-Variance Tradeoff

模型準確度、偏差-變異權衡：從零開始完整筆記

Supervised Learning - University of Colorado Boulder

本文件怎樣讀

主體以你上傳的課件 PDF 與逐字稿為基礎；課件中的定義、例子與結構會保留。為幫助理解而加入的額外例子、診斷技巧或延伸說明，會清楚標示為「補充理解」，避免和課件原文混在一起。

適合用途：課前預習、課後複習、作業概念整理、考試速查。

1. 這一課到底在講甚麼？

整課的核心不是「怎樣令 training data 的分數最高」，而是：模型能否在未見過的新資料（unseen data）上仍然表現良好。這種能力叫 generalization（泛化能力）。

一句話總結

模型太簡單會 underfit；模型太複雜會 overfit。Bias-Variance Tradeoff 就是在這兩個極端之間，尋找 test / validation error 最低的「sweet spot」。

1.1 課件的六個重點

理解 model error 與 regression error metrics。

理解 bias 與 variance 的含義。

理解 model complexity 如何改變 bias 與 variance。

辨認 underfitting（high bias）與 overfitting（high variance）。

用 bullseye（靶心）比喻直觀理解「偏得多」和「波動大」。

理解尋找 optimal model complexity 的實務方向。

1.2 全課概念地圖

起點

中間問題

結果

你要記住

Model 產生 prediction

Prediction 與 actual 有差距

Error

要用 MAE / MSE / RMSE 等指標衡量

Model 太簡單

太多強假設

High Bias / Underfitting

Train 差、Test 也差

Model 太複雜

對 training fluctuations 太敏感

High Variance / Overfitting

Train 很好、Test 很差

合適 complexity

捕捉 signal、避免 noise

Good Generalization

Validation / Test error 較低

來源對照：課件第 2、5、6、8、10、12、18 頁。

2. Model Error：模型到底「錯」在哪裡？

課件先用房價預測作為主線。假設我們只用房屋面積（Square Feet）預測 Price，最簡單的線性模型可以寫成：

Price = β₀ + β₁ × Square Feet

β₀ = intercept / baseline；β₁ = slope / 每多 1 square foot 對價格的影響

2.1 課堂例子

逐字稿中的例子約為：

Price = 49,428 + 110 × Square Feet

如果房屋面積是 2,000 sqft：

Predicted Price = 49,428 + 110 × 2,000 = 269,428

假設真正成交價（Actual Price）是 $280,000，prediction 和 actual 之間就會有一個差距。這個差距就是 prediction error / residual 的直觀概念。

Error = Actual - Predicted = 280,000 - 269,428 = 10,572

最重要的直覺

Prediction 不可能每次都剛好等於 Actual。Machine Learning 的評估，就是把「錯多少」用一致的方法量化，再比較不同模型。

2.2 正負 Error 為甚麼不能直接平均？

如果一筆預測高估 $10k，另一筆低估 $10k，直接相加會互相抵銷成 0；但兩筆明明都錯了。因此課堂引入 absolute value 或 square，避免正負號互相抵銷。

樣本

Predicted

Actual

Signed Error

A

$300k

$310k

+ $10k

B

$300k

$290k

- $10k

直接平均

0（會誤導）

來源對照：課件第 3 頁；逐字稿的 house-price linear regression 與 error 解說。

3. MAE、MSE、RMSE：三種 Regression Error Metrics

3.1 MAE - Mean Absolute Error

MAE = (1/n) × Σ |yᵢ - ŷᵢ|

把每個 error 變成正數，再取平均

例子：errors = -5、8、-3。先取絕對值：5、8、3。

MAE = (5 + 8 + 3) / 3 = 5.33

直觀解讀

MAE = 5.33 可以理解為：平均每一筆 prediction 大約差 5.33 個原始單位。

3.2 MSE - Mean Squared Error

MSE = (1/n) × Σ (yᵢ - ŷᵢ)²

將每個 error 平方，所以正負號都會消失

MSE = (25 + 64 + 9) / 3 = 32.67

平方的另一個效果是：大錯誤會被放大。錯 2 的平方是 4；錯 10 的平方是 100，所以 MSE 對大 error 更敏感。

3.3 RMSE - Root Mean Squared Error

RMSE = √MSE

RMSE = √32.67 ≈ 5.72

RMSE 把 MSE 再開根號，因此回到接近原本 target 的單位，比 MSE 更容易用原始尺度解讀。

3.4 三者快速比較

Metric

核心做法

對大錯誤敏感度

解讀

MAE

取 absolute value 再平均

較低

平均錯多少，直觀

MSE

error 平方再平均

高

大錯誤懲罰更重；單位變成平方

RMSE

MSE 再開根號

高

保留 MSE 對大錯的敏感度，且較接近原單位

課件內容

課堂逐字稿明確提到 MAE 使用 absolute value、MSE 將差值平方、RMSE 是平方誤差指標再開根號。

來源對照：課件第 3 頁圖表 + 逐字稿對 MAE / MSE / RMSE 的口頭解說。

4. What Makes a Good Model? 真正好的模型不是只看 Training

課件把 good model 定義成同時在 training data 和 unseen data 上表現良好，並在「捕捉真實 pattern」與「避免 noise / random fluctuations」之間取得平衡。

4.1 Generalization（泛化）

Generalization

模型在沒有見過的新資料上仍然能做出合理 prediction 的能力。這比 training score 本身更重要。

可以把 training data 想成練習題，把 test data 想成真正考試。若一個模型只是把 training examples「背熟」，但換到新資料就失準，它並沒有真正學到 underlying pattern。

4.2 Signal vs Noise

概念

意思

房價例子

Signal / Pattern

資料中可重複、可泛化的規律

一般而言面積變大，價格會有系統性變化

Noise / Random Fluctuation

偶然、局部、不可穩定重複的波動

某一間屋因裝修、競價、特殊位置而異常昂貴

關鍵問題

模型太簡單：連 signal 都學不到。模型太複雜：signal 學到之餘，連 noise 都當成規律。

來源對照：課件第 5 頁；逐字稿對 generalization、pattern 與 random fluctuations 的解說。

5. Bias：模型「固有假設」造成的偏差

課件定義 Bias 為來自 incorrect assumptions 的 error。High Bias 代表模型在看資料之前已經作了很強的結構假設，以致無法捕捉真實 relationship。

5.1 High Bias 的人話

High Bias = 模型太固執 / 太簡化

模型不是偶然錯一次，而是因為本身的假設太強，所以會在某些區域「有系統地」預測錯。

5.2 為甚麼 Linear Model 可能有 High Bias？

Linear Regression 預先限制 relationship 必須由一條直線表示。若真實房價 pattern 有彎曲、平台或局部 premium，直線模型即使把參數調到最好，也不可能完整表示那個 shape。

課件第 9 頁：Linear model 無法完整捕捉非線性的 true market pattern，屬於 high-bias 例子。

5.3 High Bias 的症狀

Poor performance on training data。

Poor performance on test data。

Training 和 test 都不理想，通常不是「背太多」，而是模型能力不足。

High Bias → Underfitting

5.4 一個超簡單例子

真正關係假設是 y = x²（彎曲），但模型被限制只能學 y = a + bx（直線）。這時即使 training data 很多，直線仍然無法完整表示 x²。問題在模型的假設，而不是單次抽樣。

來源對照：課件第 8、9 頁。

6. Variance：模型對 Training Data 的敏感程度

課件定義 High Variance 為 model 對 training data 太敏感。Training data 只要有一點改變，模型的 fitted relationship 就可能明顯改變。

6.1 High Variance 的人話

High Variance = 太靈活、太容易受資料波動影響

模型為了把 training data fit 得非常漂亮，連 random noise 都跟著學，造成在新資料上不穩定。

6.2 15-degree Polynomial 的課堂例子

課件用 degree 15 polynomial 示範：高次多項式可以非常靈活地穿過 training points，但曲線因此產生不必要的劇烈彎動，這些彎動往往是在捕捉 noise，而不是真實市場 pattern。

課件第 11 頁：15-degree polynomial 過度追隨 training points，產生 wild predictions。

6.3 High Variance 的症狀

Excellent performance on training data。

Poor performance on test data。

Train-test gap 很大，是典型警號。

High Variance → Overfitting

容易混淆

這裡的「Variance」是在講 model predictions 對不同 training samples 的敏感程度，不是單純指資料欄位本身的統計 variance。

來源對照：課件第 10、11 頁。

7. Underfitting vs. Overfitting：完整對照

面向

Underfitting

Good Fit / Balance

Overfitting

Model Complexity

太低 / 太簡單

適中

太高 / 太複雜

Bias

High

較低

通常較低

Variance

Low

可控制

High

Training Error

High

Low

Very Low

Test Error

High

Low

High

學到了甚麼

連 signal 都未學好

主要學 signal

signal + noise 都學

Generalization

差

好

差

典型描述

模型能力不足

sweet spot

模型對 training data 過敏

7.1 最值得背的因果鏈

太簡單

Too simple → strong assumptions → High Bias → cannot capture true pattern → Underfitting → Train error 高 + Test error 高。

太複雜

Too complex → very flexible → fits training fluctuations / noise → High Variance → Overfitting → Train error 很低 + Test error 高。

適中

Appropriate complexity → captures signal while avoiding much of the noise → better generalization → validation/test error 較低。

7.2 用數字快速診斷

Case

Training

Validation / Test

判斷

A

Accuracy 65%

Accuracy 63%

兩者都差 → High Bias / Underfitting

B

Accuracy 99%

Accuracy 72%

Train 很好、Test 明顯差 → High Variance / Overfitting

C

Accuracy 91%

Accuracy 89%

兩者都好而且 gap 小 → Generalization 較好

補充理解

上面用 classification accuracy 作為診斷例子，是為了幫助辨認 train/test pattern；課件本身的 bias-variance error 圖主要以 regression error 作解說。

8. Bias-Variance Tradeoff：模型複雜度為甚麼不能一直加？

課件的核心圖把 x 軸設為 Model Complexity、y 軸設為 Error。隨 complexity 增加，Bias 下降而 Variance 上升；Total Error 因此形成 U-shaped 的走勢，最低點附近就是最佳平衡。

課件第 12 頁：Bias 下降、Variance 上升，而 Total Error 在中間有 Minimum Total Error。

8.1 左、中、右三個區域

區域

Bias

Variance

結果

左：Low Complexity

高

低

Underfitting

中：Optimal Complexity

較低 / 平衡

較低 / 可控

最低 total error 附近

右：High Complexity

低

高

Overfitting

8.2 最重要的方向關係

Model Complexity ↑  ⇒  Bias ↓  and  Variance ↑

這正是課件 Quiz 的答案：當模型變得更 flexible，它能減少原本過強的 assumptions，所以 bias 通常下降；但同時更容易隨 training fluctuations 改變，所以 variance 通常上升。

考試記憶句

Complexity ↑ → Bias ↓、Variance ↑。Complexity ↓ → Bias ↑、Variance ↓。

來源對照：課件第 12、15、17 頁。

9. The Bullseye Analogy：用射靶真正理解 Bias 與 Variance

靶心（bullseye）代表 true value / 真正目標；每一發飛鏢可以想成模型在不同 training samples 下得到的一次 prediction。

課件第 14 頁：三種典型組合 - High Bias/Low Variance、Low Bias/High Variance、Low Bias/Low Variance。

9.1 High Bias, Low Variance

看靶面

Bias

Variance

ML 含義

飛鏢聚得很密，但整群離靶心很遠

High：平均位置偏離真正目標

Low：每次結果彼此很接近

Consistent but inaccurate；通常對應 underfitting

最容易懂的比喻：一個體重磅永遠多顯示約 5 kg。70 kg 的人每次量到 75.0、75.1、74.9、75.0。結果很穩，但整體有固定偏差。

9.2 Low Bias, High Variance

看靶面

Bias

Variance

ML 含義

飛鏢散到四周，平均中心可能接近靶心

Low：沒有明顯固定方向偏差

High：每次結果變化很大

Scattered widely；通常對應 overfitting / 不穩定

體重磅例子：真正 70 kg，但量到 60、80、65、77、68。平均可能接近 70，可是單次結果非常不可靠。

9.3 Low Bias, Low Variance

看靶面

Bias

Variance

ML 含義

飛鏢集中在靶心附近

Low：接近真正目標

Low：每次結果穩定

Accurate and precise；理想狀態

體重磅例子：69.9、70.1、70.0、69.8。既接近真正 70，也非常穩定。

一眼判斷法

Bias 看「整群飛鏢的中心離靶心有多遠」；Variance 看「飛鏢彼此散得有多開」。

來源對照：課件第 13、14 頁。

10. Accurate vs. Precise：Bullseye 圖最容易混淆的兩個字

課件用「accurate and precise」形容 Low Bias + Low Variance。這兩個詞在 bullseye 比喻裡可以這樣理解：

詞

直觀意思

與 Bias/Variance 的關係（概念上）

Accurate

整體接近真正目標

較接近「低 bias」的直覺

Precise

每次結果彼此很接近、很穩定

較接近「低 variance」的直覺

重要

這是用 bullseye 幫助直觀理解，不是要把「accuracy = bias」、「precision = variance」當成正式數學等號。

10.1 Systematic Error 是甚麼？

課件把 High Bias, Low Variance 描述為 consistent but inaccurate shots（systematic error）。Systematic error 的重點是：錯誤不是隨機四散，而是長期朝某個方向偏。

情況

例子

為甚麼

Systematic / 固定偏差

溫度計長期多顯示 2°C

每次都朝同一方向偏

Random / 波動大

同一溫度反覆量到 18、23、20、25°C

結果散布很大，但未必有固定方向

來源對照：課件第 13 頁的 systematic error 描述；其餘例子為輔助理解。

11. Total Error Decomposition：Total Error 從哪裡來？

課件指出，對 regression 的 squared-error 框架，可以把 total error 概念上拆成三部分：Bias²、Variance 和 Irreducible Error。

Total Error = Bias² + Variance + Irreducible Error

課件第 16 頁：Total Error = Bias² + Variance + Irreducible Error。

11.1 三部分分別是甚麼？

部分

課件意思

直觀理解

Bias²

predictions 與 true values 的系統性距離

模型本身的 assumptions 不夠合適

Variance

predictions 隨 training data 改變的幅度

模型太敏感、太不穩

Irreducible Error

problem itself 的 noise

即使模型再好，也有些不可預測因素

11.2 Irreducible Error：為甚麼永遠不一定能做到 0 Error？

房價會受很多當下無法知道或無法完整觀測的因素影響。例如未來市場波動、突發事件、個別買家的競價行為等。這類 noise 不一定能靠調 model complexity 消除。

可控制 vs 不可完全控制

Bias 和 Variance 可以透過選模型、調 complexity、validation 等方式改善；Irreducible Error 則屬於問題本身的不可消除噪音。

來源對照：課件第 16 頁 + 逐字稿對 irreducible error 的市場波動例子。

12. Balancing the Tradeoff：課件列出的三種方向

課件指出 model complexity 直接影響 bias-variance tradeoff，並列出三個尋找 balance 的方法：Cross-validation、Regularization techniques、Ensemble methods。

方法

課件定位

核心目的

Cross-validation

找 balance 的方法之一

用多次 validation 更可靠地比較 model complexity

Regularization techniques

找 balance 的方法之一

限制模型過度複雜 / 過度追隨 training data

Ensemble methods

找 balance 的方法之一

結合多個模型，改善整體穩定性與泛化

12.1 補充理解：Cross-validation

補充理解

以下是為了幫助你理解課件列出的術語，並非這支影片內完整推導。

例如 5-fold cross-validation：資料分成 5 份，每次用 4 份 train、1 份 validate，輪流 5 次再平均 validation performance。這樣比單一 train/test split 更能看出模型是否穩定。

12.2 補充理解：Regularization

Regularization 可以理解成：除了要求模型 fit data，還對「太複雜」施加 penalty。概念上常見效果是降低 variance，但可能犧牲一點 bias，正是 tradeoff 的實務表現。

12.3 補充理解：Ensemble

Ensemble 是把多個模型的結果結合。例如 Random Forest 會結合多棵 decision trees。影片只把 Random Forest 作為 ensemble methods 的例子，沒有在這一課深入演算法細節。

來源對照：課件第 15 頁；逐字稿提及 cross-validation、regularization、ensemble methods such as random forests。

13. 實戰診斷：看到 Training / Test 表現時怎樣判斷？

13.1 Decision Rule

Training performance

Test / Validation performance

最可能問題

第一個概念

差

差

模型能力不足

High Bias / Underfitting

很好

差

模型太貼 training data

High Variance / Overfitting

好

好

generalization 較好

Balance / Good Fit

13.2 Regression 例子

Model

Train RMSE

Test RMSE

判斷

Model A

45

48

兩者都高 → 可能 underfit

Model B

5

40

Train 非常低但 Test 很高 → 典型 overfit

Model C

18

20

兩者都較低且 gap 小 → 較合理

13.3 最常見的錯誤觀念

「Training accuracy 最高的 model 一定最好」- 錯。真正目標是 unseen-data performance。

「模型越複雜一定越準」- 錯。複雜度增加可能降低 bias，但也會提高 variance。

「Overfitting 就是 training 表現差」- 錯。Overfitting 的典型特徵反而是 training 非常好。

「Underfitting 就是 test 表現差」- 不完整。Underfitting 通常 training 也不好。

一句診斷口訣

Train 差 + Test 差 = Bias；Train 好 + Test 差 = Variance。

14. Quiz / 考試題型整理

Q1. As model complexity increases, what happens to bias and variance?

答案：Bias decreases, Variance increases。理由：模型更 flexible，能減少過強 assumptions，但同時更容易受 training fluctuations 影響。

Q2. Excellent training performance, poor test performance?

答案：High Variance / Overfitting。

Q3. Poor training performance, poor test performance?

答案：High Bias / Underfitting。

Q4. Linear model 用來 fit 明顯 nonlinear relationship?

答案：High Bias 的典型例子。

Q5. Very high-degree polynomial 穿過 training noise?

答案：High Variance 的典型例子。

Q6. Total Error 的三部分?

答案：Bias² + Variance + Irreducible Error。

Q7. Bullseye 圖中「集中但偏離中心」?

答案：High Bias, Low Variance。

Q8. Bullseye 圖中「散得很開但平均接近中心」?

答案：Low Bias, High Variance。

來源對照：Q1 直接對應課件第 17 頁 Quiz；其餘為依照本課核心概念整理出的練習題。

15. 必背詞彙 Glossary

English

中文 / 人話

一行記憶

Model Error

模型誤差

prediction 和 actual 的差距

Generalization

泛化能力

新資料也能做得好

Bias

偏差

模型 assumptions 造成的系統性錯誤

Variance

變異 / 不穩定性

training data 一變，模型也變很多

Underfitting

欠擬合

模型太簡單，signal 都學不足

Overfitting

過擬合

模型太複雜，連 noise 都學

Model Complexity

模型複雜度

模型可以表示多複雜 relationship 的程度

Noise

噪音 / 隨機波動

不穩定、不可泛化的變化

Sweet Spot

最佳平衡點

total/validation error 最低附近

Irreducible Error

不可約誤差

問題本身無法完全消除的 noise

Systematic Error

系統性誤差

長期向同一方向偏

Accurate

準確

接近真正目標

Precise

精密 / 穩定

每次結果彼此接近

16. 一頁 Cheat Sheet：考試前只看這頁

核心 1

Good model 的真正目標 = Generalization，不是只追求 training score。

核心 2

High Bias = Underfitting = model too simple = Train 差 + Test 差。

核心 3

High Variance = Overfitting = model too sensitive/complex = Train 很好 + Test 差。

核心 4

Complexity ↑ → Bias ↓、Variance ↑。

核心 5

最佳 model 在中間 sweet spot：既能捕捉 pattern，又不過度 fit noise。

Total Error = Bias² + Variance + Irreducible Error

Bullseye 口訣

圖像

判斷

集中但射歪

High Bias, Low Variance

散到周圍

Low Bias, High Variance

集中在靶心

Low Bias, Low Variance（理想）

Regression Metrics 口訣

MAE

MSE

RMSE

absolute 後平均

square 後平均；大錯罰重

MSE 開根號；回到接近原單位

17. 資料來源與內容邊界

本文件主要整理自你上傳的：

Model Accuracy and Bias-Variance Tradeoff.pdf

Model Accuracy and Bias-Variance Tradeoff.txt（影片逐字稿）

其中以下內容屬於課件 / 逐字稿直接支持的主線：model error、MAE/MSE/RMSE 的口頭解說、generalization、bias、variance、underfitting、overfitting、house-price examples、15-degree polynomial、bullseye analogy、model complexity tradeoff、cross-validation / regularization / ensemble methods、total error decomposition、quiz。

文件中標示為「補充理解」的部分（例如 5-fold cross-validation 的具體流程、regularization 的 penalty 直覺、用 classification accuracy 做診斷例子）是為幫助理解而加入，不代表這支影片已完整教授那些細節。

最終記憶

Bias 問的是「整體偏得多不多」；Variance 問的是「換一批 training data，模型會變得多不多」。真正的 ML 目標，是在兩者之間找到對 unseen data 最好的平衡。

## Connections

[[Supervised Learning MOC]] · [[Supervised Learning - Module 1 MOC]] · [[Mathematical Foundations for Machine Learning- Overview]] · [[Programming Foundations for Machine Learning]]

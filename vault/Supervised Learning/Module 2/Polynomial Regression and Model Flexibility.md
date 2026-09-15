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

# Polynomial Regression and Model Flexibility

> [!info] Learning position
> Supervised Learning → Module 2 → Topic 5

## Polynomial_Regression_Model_Flexibility_逐頁詳細分析

Polynomial Regression &Model Flexibility

逐頁完整詳細分析｜繁體中文學習筆記

依據：University of Colorado Boulder - Supervised LearningDaniel E. Acuna 教授｜PDF 12 頁 + 影片逐字稿

這份筆記的閱讀方法  每一頁都分成：PDF畫面 → 原頁重點 → 影片補充 → 淺白拆解 → 公式／圖形理解 → 易錯點與銜接。來源沒有明講的延伸內容會標成「補充理解」，避免把補充當成投影片原文。

整體脈絡先看懂

先發現問題：真實關係可能是彎的，直線模型會有結構性限制。

加入 X²、X³ 等多項式特徵，讓線性迴歸可以畫出彎曲的預測曲線。

雖然對 X 是非線性的，但對 β 係數仍然是線性的，所以仍可使用 least squares。

degree 越高，模型越靈活；訓練集通常越貼，但也越容易把 noise 當 signal。

因此不能只看 training R²／MSE，而要用 validation / cross-validation 選 degree。

最終目標不是「最複雜」，而是新資料 prediction error 最低、generalization 最好。

12 頁地圖

1. 課題定位：Polynomial Regression & Model Flexibility

2. 本課路線圖與學習問題

3. Linear vs Non-linear：為什麼直線不夠

4. Polynomial Regression：數學形式與「仍是線性模型」

5. Wage vs Age：不同 degree 的曲線比較

6. Polynomial coefficients 怎樣解讀

7. Polynomial degree 怎樣選：太低 vs 太高

8. Overfitting：training fit 好不代表新資料好

9. Flexibility vs Simplicity：Bias-Variance Trade-off

10. Model Selection：validation / cross-validation 的流程

11. 其他增加 flexibility 的方法

12. 全章總結：與 least squares / linear regression 接回同一條主線

第 1 頁｜Polynomial Regression & Model Flexibility

一句話抓重點  這一課的核心不是「換掉 linear regression」，而是把 linear regression 擴充得更能描述彎曲關係。

原 PDF 第 1 頁

原頁在做什麼？

第 1 頁是課題封面，標示主題為 Polynomial Regression & Model Flexibility，屬於 Supervised Learning。這個標題其實把本課兩條主線直接放在一起：第一，如何用 polynomial terms 捕捉非線性；第二，模型越靈活時如何控制複雜度。

影片開場補充

影片一開始強調：有時候不需要收集新的 predictor，只要把現有 X 轉換成 X²、X³ 等特徵，就可能大幅改善模型表現；但這種「增加複雜度」必須小心，因為複雜度同時帶來 overfitting 風險。

你應該先建立的心智模型

原本：X  →  Ŷ = β₀ + β₁X

只有一條直線

擴充：X  →  [X, X², X³, …]  →  Ŷ

仍用迴歸，但曲線可以彎

所以這一課不是要否定之前學過的 OLS / least squares，而是告訴你：同一個 OLS 框架，只要「feature representation」改變，模型能表示的形狀就會改變。

和你之前學的 Linear Regression 接在哪裡？

Simple Linear Regression：只有 X，一條直線。

Multiple Linear Regression：有多個 features，例如 X₁、X₂、X₃。

Polynomial Regression：把同一個原始 X 轉成多個 features，例如 X、X²、X³。

三者都可以寫成「Y = Xβ + ε」的線性係數形式，因此仍可沿用 least squares 的核心思路。

資料依據：PDF 第 1 頁；同一課堂影片逐字稿的相關講解。

第 2 頁｜Contents of This Video

一句話抓重點  這一頁其實是一條完整因果鏈：直線不足 → 加 polynomial → degree 選擇 → overfitting → model selection。

原 PDF 第 2 頁

七個主題不是獨立章節，而是一條推理鏈

1. Limitations of linear models：如果真實關係彎曲，直線會 underfit。

2. Introduction to polynomial regression：加入 X²、X³ 讓曲線能彎。

3. Mathematical formulation：理解 degree d 模型與 β 係數形式。

4. Wage vs Age example：把抽象公式放到可視化例子。

5. Choosing degree：degree 是 flexibility 的旋鈕。

6. Flexibility vs overfitting：越靈活並不等於越會預測新資料。

7. Model selection：用 validation / CV 實際選擇模型複雜度。

真正的課堂問題

核心問題  「我知道 degree 越高可以貼得越好，但到底高到哪裡應該停？」後面第 7–10 頁就是回答這個問題。

學完這一課你應該能做到

看散點圖時，判斷 straight-line assumption 是否可能過度簡化。

寫出 quadratic / cubic / degree-d polynomial regression。

解釋為何它對 X 非線性、但對 β 仍線性。

不把高 training R² 誤認為高 generalization。

用 validation / cross-validation 選 polynomial degree。

資料依據：PDF 第 2 頁；同一課堂影片逐字稿的相關講解。

第 3 頁｜Linear vs Non-linear Relationships

一句話抓重點  若資料的平均趨勢本身是彎曲的，任何單一直線都只能「取一個折衷」，因此會系統性地錯。

原 PDF 第 3 頁

圖像逐部分讀法

左圖標示 Linear Relationship：藍色資料點大致沿橙色直線分布，直線可以合理描述「Age 增加時 Wage 大致以固定斜率增加」。右圖標示 Non-linear Relationship：資料呈明顯彎曲趨勢，單一直線即使通過資料中央，兩端或局部仍會有系統性偏差。

為什麼「一條直線」會失敗？

Simple linear regression 假設條件平均數 E[Y|X] 可以用 β₀ + β₁X 描述。這代表每增加 1 單位 X，預測 Y 的改變永遠是同一個 β₁。若真實世界的 slope 會隨 X 改變，例如年輕階段上升較快、中段變平、後段下降，固定 slope 就不夠。

Linear：dŶ/dX = β₁

斜率固定，不會隨 X 改變

Wage vs Age 的概念例子

投影片文字用「薪資早期上升、中年附近達到高峰、接近退休時可能下降」來說明 rise-then-fall 的非線性。這只是教學情境，用來說明 curve；它不是說每個人的薪資一定遵循同一形狀，也不是因果結論。

如果硬用 linear model，會看到什麼訊號？

Residuals 可能不是隨機散佈，而呈弧形／U 形 pattern。

模型在某些 X 區間持續高估，在另一些區間持續低估。

即使整體 R² 不算差，局部 prediction 仍可能有明顯偏差。

關鍵詞  這類錯誤屬於 model form 不夠靈活造成的 underfitting / bias，不是單純「資料有 noise」。

資料依據：PDF 第 3 頁；同一課堂影片逐字稿的相關講解。

第 4 頁｜Introducing Polynomial Regression

一句話抓重點  Polynomial regression = 先把 X 變成 X、X²、X³…，再把這些當作 predictors 放回熟悉的線性迴歸。

原 PDF 第 4 頁

四條公式逐條看

Linear (degree 1):   Y = β₀ + β₁X + ε

Quadratic (degree 2):   Y = β₀ + β₁X + β₂X² + ε

Cubic (degree 3):   Y = β₀ + β₁X + β₂X² + β₃X³ + ε

Degree d:   Y = β₀ + β₁X + β₂X² + … + βdXᵈ + ε

Degree 到底是什麼？

degree 是模型中 X 的最高次方。例如最高到 X³，就是 degree 3。degree 越高，理論上曲線可以有更多彎曲與局部變化，因此 flexibility 通常越高。

最重要的一句：nonlinear in X，但 linear in coefficients

影片特別重複這點。以 cubic 為例，X 被平方、立方，所以 Ŷ 對 X 的形狀是非線性；但 β₀、β₁、β₂、β₃ 都只是「乘上一個已知 feature」後相加，係數本身沒有被平方、放進 sin()、相乘在一起。因此從參數估計角度，它仍然是 linear regression。

因此可以繼續用 OLS  你不是發明一套新的 fitting 方法；只是先建立新的 feature columns，再照舊最小化 SSE / MSE。

用 design matrix 看最清楚

原始一欄 X  →  新特徵矩陣 [1, X, X², X³]

每一列是一筆 observation，每一欄是一個 feature

例如 Age = 30，轉換後可形成 [1, 30, 900, 27000]。OLS 只看到四個欄位，並不知道其中三欄來自同一個 Age；它照樣尋找最能減少 squared residuals 的 β。

補充理解：為何 feature scaling 可能變重要？

這不是本頁投影片的重點，但從數值角度可理解：若 X 很大，X³ 可能比 X 大很多個數量級。實務中常會中心化／標準化或使用穩定的 polynomial feature pipeline。這是實作層面的補充，不影響本課「仍可用 least squares」的核心結論。

資料依據：PDF 第 4 頁；同一課堂影片逐字稿的相關講解。

第 5 頁｜Example: Wage vs Age with Polynomial Terms

一句話抓重點  同一批資料，用 degree 1、2、3 會得到不同曲線；差別不是演算法換了，而是允許模型表達的形狀不同。

原 PDF 第 5 頁

先讀圖例

藍色散點：observed data。

橙色 Linear (degree 1)：只能是一條直線。

綠色 Quadratic (degree 2)：可以有一次主要彎曲。

紅色 Cubic (degree 3)：可有更豐富的彎曲形狀。

這張圖真正想比較什麼？

它不是要你背哪一條顏色「最好」，而是要你看到：當資料的平均趨勢不是直線時，增加 polynomial terms 可以使 fitted curve 更貼近資料的彎曲結構。degree 1 提供固定 slope；degree 2 / 3 允許 slope 隨 Age 改變。

投影片畫面與口述例子的細節差異

值得留意  第 3 頁與影片口述用「先升、到中年高峰、之後下降」說明非線性；但第 5 頁這組示意散點在可見範圍內更像「先稍降、再明顯上升」，不同 polynomial 曲線主要用來展示形狀彈性。兩者的共同重點都是「直線不足以捕捉彎曲」，不要把示意資料當成真實工資規律。

一個非常淺白的理解

把模型想成畫圖工具：degree 1 是直尺；degree 2 像可彎一次的尺；degree 3 可以再多一點曲率。工具越靈活，就越能貼著資料走，但也越有機會把每個小抖動都當真。

為何 cubic 常比 linear 更貼？

因為 cubic 包含 linear 的可能性。若資料其實真的是直線，模型可以讓 β₂、β₃ 接近 0；若資料需要彎曲，它又有額外自由度可用。這也是為什麼 training fit 通常只會改善或不變，但不代表 test performance 一定改善。

資料依據：PDF 第 5 頁；同一課堂影片逐字稿的相關講解。

第 6 頁｜Interpreting Polynomial Models

一句話抓重點  Polynomial model 的 β 不能逐個孤立解讀；應看「所有 terms 合起來形成的整體曲線」。

原 PDF 第 6 頁

投影片的 cubic model

Wage = β₀ + β₁Age + β₂Age² + β₃Age³

投影片直接提醒：β₂ 並不簡單等於「Age² 的效果」。原因是 Age、Age²、Age³ 彼此由同一個 Age 產生，高度相關；改變 Age 時，三個 terms 會同時改變，所以預測的局部方向是多個係數共同作用的結果。

為什麼不能照 simple linear regression 那樣說？

在線性模型 Wage = β₀ + β₁Age 中，可以說「Age 每多 1 年，預測 Wage 改變 β₁」。但 cubic model 中，Age 從 30 變 31 時，不只是 β₁Age 變；Age² 與 Age³ 也一起變。因此 β₁ 不能單獨代表所有年齡的 slope。

補充理解：真正的局部 slope 是整體導數

dŶ/dAge = β₁ + 2β₂Age + 3β₃Age²

補充數學直覺：slope 會隨 Age 改變

這個導數不是投影片要求你計算的公式，而是用來證明為什麼「各 β 會共同決定曲線」。某個 Age 下 slope 為正，代表模型預測正在上升；為負則代表模型預測正在下降。

課堂建議的正確解讀方式

描述整體 pattern，例如「隨 Age 增加，Wage 先上升，之後趨平／下降」。

看圖形的 peak、turning point、上升／下降區間。

若目的是 prediction，可把重點放在預測品質，而不是硬為每個 polynomial coefficient 賦予直觀因果意義。

Trade-off  模型越靈活，通常越難用一兩個係數講清楚；performance 可能提升，但 interpretability 會下降。

資料依據：PDF 第 6 頁；同一課堂影片逐字稿的相關講解。

第 7 頁｜Choosing the Polynomial Degree

一句話抓重點  Degree 是控制模型 flexibility 的旋鈕：太低抓不到 pattern，太高把 noise 也學進去。

原 PDF 第 7 頁

左圖：Good Fit, Degree 3

左圖用相對低的 cubic curve 追蹤主要趨勢，不試圖穿過每一個點。這代表模型承認資料有隨機波動，只學較穩定的 signal。

右圖：Overfitting, Degree 10

右圖的高 degree 曲線出現多次急彎，為了貼近少量 training points 而大幅扭動。這種形狀對訓練資料可能很好看，但小小改變資料樣本，曲線可能就完全不同，代表 variance 很高。

Too low vs Too high

Too low：underfitting：模型表達能力不足，重要的曲率被忽略。

Too high：overfitting：模型自由度太大，把 sampling noise / random fluctuation 當成可重複規律。

影片用極端例子提醒

講者提出直觀想像：如果資料有很多點，而 polynomial degree 高得足以提供極多自由度，理論上可能把 training points 幾乎逐點貼住。這時 training error 可以非常低，但那不是我們真正想要的目標。

不要問「最高可以到幾次？」  真正要問的是：「哪一個 degree 對未見資料的 prediction error 最低？」

資料依據：PDF 第 7 頁；同一課堂影片逐字稿的相關講解。

第 8 頁｜The Overfitting Problem

一句話抓重點  Training data 上近乎完美，不等於 test / future data 上準；模型可能只是記住 noise。

原 PDF 第 8 頁

圖中有兩種資料與兩條模型線

圖示把 training data 與 test data 分開，並比較較平滑的 quadratic model 與更彎曲的高 degree model。高 degree 曲線在 training points 附近可以非常貼，但對未參與 fitting 的 test points 不一定更接近。

關鍵句：High R² on training data ≠ Good predictions on new data

這是整課最重要的模型評估觀念之一。當你加入更多 polynomial terms，training R² 通常會上升，training MSE 通常會下降，因為模型可選的函數集合變大；但新資料的誤差可能先下降、之後反而上升。

Signal vs Noise

Signal：可在未來資料中重複出現的穩定結構。

Noise：只屬於這批 sample 的偶然波動、測量誤差、抽樣差異。

Overfitting：模型把 noise 也當成 signal，導致 training 很好、generalization 變差。

為什麼高次 polynomial 特別容易在邊界失控？

補充理解：高次多項式在資料範圍兩端可能產生劇烈彎曲或外插爆炸。這不是本頁投影片的主要推導，但圖中的高 degree 曲線在左右端急轉，正好能視覺化這種不穩定。

實務判斷  看到 training R² 很高時，下一個問題永遠應該是：「validation / test 呢？」而不是立即宣布模型很好。

資料依據：PDF 第 8 頁；同一課堂影片逐字稿的相關講解。

第 9 頁｜Flexibility vs Simplicity Trade-off

一句話抓重點  低複雜度：bias 高、variance 低；高複雜度：bias 低、variance 高；總 prediction error 通常在中間出現甜蜜點。

原 PDF 第 9 頁

三條線怎樣讀？

Bias（橙線）：模型太簡單時高；增加 complexity 後下降。

Variance（藍線）：模型越複雜越容易隨 sample 波動，因此上升。

Total Error（紅線）：兩者共同作用後呈 U-shape，最低點就是希望選到的 complexity。

為什麼會 U-shape？

一開始從 degree 1 增加到 2、3，模型終於能捕捉真正的彎曲，所以 bias 大幅下降，總誤差跟著下降。再繼續增加 degree，bias 雖可能再少一點，但 variance 增加得更快，模型對 training sample 的偶然差異變得敏感，所以未來 prediction error 反而上升。

Expected test error ≈ Bias² + Variance + Irreducible Noise

概念式：課堂重點是 bias/variance 的折衷，而非要求本頁推導

圖上的 Optimal Complexity

綠色虛線標出 toy example 的最佳複雜度，大約在 degree 2 附近。注意：這個數字只是示意，不代表所有 polynomial regression 都應選 degree 2；真正 degree 必須由資料與 validation 結果決定。

逐字稿的一個口語／轉錄細節

逐字稿在描述複雜度增加時有一句出現「more variance ... and the less variance」的矛盾表述；結合投影片圖與前後文，這裡的概念應是：complexity 增加 → variance 增加、bias 降低。這份筆記保留來源脈絡並以圖示所表達的標準 bias-variance trade-off 解讀。

最重要的轉換  Model selection 的目標從「fit training data」轉成「minimize future prediction error」。

資料依據：PDF 第 9 頁；同一課堂影片逐字稿的相關講解。

第 10 頁｜Model Selection Strategies

一句話抓重點  用 validation / cross-validation 比較 degree；test set 留到最後一次，避免把 test 也變成調參工具。

原 PDF 第 10 頁

投影片的選模流程，逐步拆解

1. Split data：把資料分成 training 與 validation；若另有 test set，test 要留到最後。

2. Try degrees：degree 1、2、3、4… 分別建立 polynomial features 並 fit。

3. Compare validation performance：用 validation MSE、RMSE、R² 等一致指標比較。

4. Choose best degree：選 validation 表現最好、或在差不多表現下更簡單的 degree。

5. Final test：模型決定後才在獨立 test set 評估一次，估計真正 generalization。

為什麼不能看 training error 選 degree？

因為更高 degree 幾乎總能把 training fit 做得至少一樣好，所以 training error 會偏向選最複雜模型。Validation 的角色是模擬「未見資料」，讓我們看 complexity 是否真的帶來可泛化的改善。

Cross-validation 的直覺

若只有一個 validation split，結果可能受「剛好怎樣分資料」影響。Cross-validation 會輪流用不同部分做 validation，再把多次結果平均，因此通常比單一 split 更穩健。投影片把這一頁稱為 cross-validation approach，步驟圖本身則用 training/validation/test 的基本框架呈現。

Practical guidelines 逐條解釋

Start simple：先 linear，再 quadratic、cubic，避免一開始就 degree 10。

Diminishing returns：若 degree 3 到 4 只改善極少，可能沒有足夠理由承擔額外複雜度。

Domain knowledge：如果理論上只期待單一彎曲，不需要無限制增加 degree。

Performance vs interpretability：若業務需要解釋，較簡單模型可能更有價值。

防止 data leakage  一旦你反覆用 test set 來挑 degree，test set 就不再真正「未見」。因此 degree 應在 validation / CV 階段決定。

資料依據：PDF 第 10 頁；同一課堂影片逐字稿的相關講解。

第 11 頁｜Other Ways to Add Flexibility

一句話抓重點  Polynomial terms 只是增加 flexibility 的其中一種方法；不同方法用不同方式放鬆「直線」限制。

原 PDF 第 11 頁

1. Interaction terms

Interaction 的意思是：一個 predictor 的效果取決於另一個 predictor。投影片例子是 Age × Education 用於 wage prediction。若加入 β₃(Age×Education)，代表 Age 的 slope 可以隨 Education 改變，反之亦然。

Y = β₀ + β₁Age + β₂Education + β₃(Age×Education) + ε

interaction 讓兩個變數不再只有各自獨立的加法效果

2. Splines

投影片稱 splines 為 piecewise polynomials：不是用一條高 degree polynomial 控制整個 X 範圍，而是在不同區段用較低次多項式，再平滑接起來。這樣可提供 local flexibility，通常比單一超高次 polynomial 更穩定。

3. Decision Trees

Tree 不需要預先指定 polynomial 形狀，而是用規則切分 feature space，例如 Age < 30、Education > 某值等。投影片把它歸為 non-parametric、rule-based model。

4. Neural Networks

Neural networks 能表示非常複雜的 nonlinear relationships，因此 flexibility 很高；相對地，interpretability、tuning 與 overfitting 控制也更重要。

共同原則

More flexibility always comes with overfitting risk  這不是說 flexible model 一定 overfit，而是每增加自由度，都必須用 validation、regularization、足夠資料或其他方法證明它值得。

把這頁放回整個 ML 地圖

Polynomial regression 是最容易理解的「從線性走向非線性」橋樑。你先在熟悉的 least squares 框架中學 complexity control，之後再看 trees、splines、neural networks，核心問題仍然相同：如何取得足夠 flexibility，又保持 generalization。

資料依據：PDF 第 11 頁；同一課堂影片逐字稿的相關講解。

第 12 頁｜Summary

一句話抓重點  Polynomial regression 的本質：feature transformation + familiar linear regression + careful model selection。

原 PDF 第 12 頁

六個 Key Takeaways 逐條拆解

Capture non-linear relationships：把直線無法表達的曲率加入模型。

Still uses least squares：X²、X³ 只是新 features；估計 β 的基本方法仍可沿用。

Interpretation changes：不要逐個 β 硬解讀，應看 curve shape / overall pattern。

Flexibility vs overfitting：degree 越高越靈活，但 generalization risk 越大。

Cross-validation：用未參與 fitting 的資料選 degree，而不是看 training fit。

Balance complexity, interpretability, generalization：好模型不是最複雜，而是符合任務目標的折衷。

把整課濃縮成一條流程

Step 1｜畫圖／診斷：關係是否可能彎曲？

Step 2｜建立 polynomial features：X、X²、X³…

Step 3｜用 least squares fit 每個候選 degree。

Step 4｜比較 validation / CV prediction performance。

Step 5｜選擇適當 degree，避免 underfit 與 overfit。

Step 6｜最後在獨立 test set 評估 generalization。

Step 7｜解讀整體 curve，而非把高次係數逐個當成直觀 causal effect。

和前面 OLS 課程的最終連接

Polynomial regression = Linear regression on transformed features

這句是整課最值得記住的橋樑。你之前學過的 residual、SSE、least squares、R²、train/test、bias-variance 並沒有失效；Polynomial Regression 只是把「模型可以畫的形狀」擴充了。

30 秒背誦版  直線不夠 → 加 X²/X³ → 仍可 OLS → degree 越高越 flexible → training fit 會變好但可能 overfit → 用 validation/CV 選 degree → 看 curve shape 解讀。

資料依據：PDF 第 12 頁；同一課堂影片逐字稿的相關講解。

全章整合：從 Linear Regression 到 Model Flexibility

核心因果鏈  Non-linear pattern → polynomial features → more flexibility → lower bias but higher variance → validation-based model selection → better generalization

一個最小數字例子（補充理解）

假設你只有 Age 一個 predictor，想比較 degree 1 與 degree 2：

Degree 1:  Ŷ = β₀ + β₁Age

Degree 2:  Ŷ = β₀ + β₁Age + β₂Age²

對 Age = 20、30、40，degree 2 會把每筆資料轉成兩個數值 features：Age 與 Age²，例如 20→(20,400)、30→(30,900)、40→(40,1600)。之後 OLS 就像 multiple regression 一樣同時估 β₁、β₂。差別只是兩個 features 來自同一個原始變數。

最常見 6 個誤解

誤解 1：「Polynomial regression 不是 linear regression。」 對 X 的曲線是 nonlinear，但對 β 仍 linear，所以仍屬 linear-model framework。

誤解 2：「degree 越高一定越準。」 training 通常更貼；test / future data 可能更差。

誤解 3：「R² 最高就是最好。」 若只看 training R²，會偏向複雜模型；要看 validation/generalization。

誤解 4：「β₂ 就是 Age² 的獨立效果。」 各 polynomial terms 同時隨 Age 改變，應看整體曲線。

誤解 5：「degree 3 永遠最好。」 本課圖只是例子；degree 必須由資料、CV、domain knowledge 決定。

誤解 6：「Polynomial 是唯一的非線性方法。」 還有 interactions、splines、trees、neural networks 等。

建議你下一步要能回答的 8 條自測題

為什麼 straight-line model 可能 underfit 非線性資料？

quadratic 與 cubic 的公式分別是什麼？

為什麼 polynomial regression 對 X 非線性、但仍可用 least squares？

degree 變高時 training R² 和 training MSE 通常怎樣變？

為什麼這不代表 test error 也會一直變好？

Bias-variance trade-off 中 complexity 增加時 bias / variance 各怎樣變？

Validation / cross-validation 在選 degree 時扮演什麼角色？

為什麼 polynomial coefficient 通常不宜逐個孤立解讀？

## Polynomial_Regression_Model_Flexibility_800字精簡整理

Polynomial Regression & Model Flexibility

多項式迴歸與模型彈性｜800字精簡整理

一句話核心：加入 X²、X³… 可以讓線性迴歸捕捉彎曲關係；但模型越有彈性，越要防止 overfitting。

1｜什麼是 Polynomial Regression？

這個單元的核心是：當 X 與 Y 的關係不是直線時，可以在線性迴歸中加入 X²、X³ 等多項式特徵，讓模型擬合彎曲趨勢。簡單線性迴歸 Y=β₀+β₁X+ε 只能畫直線；二次模型加入 β₂X²，可表達一個主要彎曲；三次模型再加入 β₃X³，可表達更複雜的上升、轉折與下降。

2｜為什麼仍可用 OLS？

雖然 polynomial regression 對 X 是非線性的，但對參數 β 仍然是線性的：β 只是分別乘上 X、X²、X³ 等特徵，沒有 β² 或 β₁β₂ 這類項。因此仍可使用 least squares / OLS 求最佳係數。從資料角度看，只是把原本一欄 X 擴充成 X、X²、X³……，再照原本線性迴歸的方法估計。

3｜Wage vs Age 如何理解？

Wage vs Age 是本單元的直覺例子。若真實關係有彎曲，直線容易漏掉主要模式；quadratic 或 cubic curve 可以更貼近資料。但多項式模型的單一係數較難直接解讀，因為 β₁、β₂、β₃ 會共同決定整條曲線，所以更應看整體 shape，例如「工資隨年齡上升，到某區間達高點，之後下降」。

4｜Degree 太低或太高會怎樣？

關鍵問題是 degree 應選多高。degree 太低，模型太僵硬，形成 underfitting；degree 太高，可能把 training data 的 noise 也學進去，形成 overfitting。即使 training R² 上升、training MSE 下降，也不代表新資料預測更好；真正重要的是 generalization，也就是未見資料上的 prediction error。

5｜Bias–Variance Trade-off

這就是 bias–variance trade-off：模型太簡單時 bias 高、variance 低；模型越複雜，bias 下降，但 variance 上升。總預測誤差通常呈 U 形，因此目標不是最高 degree，而是找到 validation error 最低附近的適當複雜度。

6｜實務上如何選 Degree？

實務上可由 linear、quadratic、cubic 開始，用 validation set 或 cross-validation 比較不同 degree，再用獨立 test set 做最後檢查。整章最重要的一句話是：增加模型彈性可以改善擬合，但每增加一分彈性，也要同時警惕 overfitting。

記憶脈絡

直線不夠

加入 X² / X³

彈性上升

防止過擬合

Cross-validation 選 degree

整理依據：課程 PDF（12頁）＋影片逐字稿

## Connections

[[Supervised Learning MOC]] · [[Supervised Learning - Module 2 MOC]] · [[Multiple Linear Regression]] · [[Regression Assumptions and Diagnostics]]

---
course: Supervised Learning
module: 2
status: curated
tags:
  - supervised
  - module-2
  - diagnostics
  - evaluation
  - prediction
  - regression
publish: true
---

# Regression Assumptions and Diagnostics

> [!info] Learning position
> Supervised Learning → Module 2 → Topic 6

## Regression_Assumptions_and_Diagnostics_逐頁詳細分析

Regression Assumptions& Diagnostics

PDF 13 頁逐頁詳細分析｜附原頁截圖｜淺白 + 公式 + 圖像判讀

核心主線  Fit model → 計算 residual → 看 residual pattern → 判斷哪個 assumption 出問題 → 修改 model / data strategy

本筆記以課程 PDF 的 13 頁順序為骨架，保留原課件的術語、圖表與重點；額外的數學直覺、例子與實務補充會明確作為「延伸理解」。

課件：Regression Assumptions & Diagnostics（Supervised Learning, University of Colorado Boulder）。

0. 全章先建立一個 Mental Model

Y = Ŷ + e

實際值 = 模型解釋到的部分 + 模型仍然解釋不到的 residual

Regression diagnostics 的核心不是問「電腦有沒有成功算出係數」，而是問：模型剩下的錯誤 e 是否仍然藏著有規律的 pattern。

一句話記憶  Residual 如果是 random noise，通常比較放心；Residual 如果有 curve、fan、cluster、極端點，模型可能漏掉重要結構。

四個核心假設可記成 L-I-C-N：

縮寫

Assumption

最簡單意思

主要看什麼

L

Linearity

模型形式能捕捉 X→Y 的主要關係

Residual 是否呈 curve / systematic pattern

I

Independence

每筆 observation 的 error 不應互相牽連

Repeated data / time series / clustering

C

Constant Variance

不同 prediction level 的 error spread 大致一致

Residual plot 是否呈 fan / funnel

N

Normality

Residual distribution 大致呈 normal bell shape

Histogram / Q-Q plot

本課程特別強調 prediction-oriented 的觀點：gross violation of linearity 最直接傷害 prediction accuracy；normality 對 point prediction 相對沒有那麼關鍵。

Page 1 — Regression Assumptions & Diagnostics

PDF 原頁截圖 — Page 1

這一頁在做什麼？

封面頁，正式把主題從「如何 fit 一條 regression」推進到「fit 完之後，如何檢查這條 regression 是否可信」。

前面學過 least squares / OLS 時，我們可以算出一組 coefficients；但「算得出」不等於「模型形式適合資料」。

和前面 Linear Regression 的連接

Simple / Multiple Linear Regression 一般寫作：Ŷ = β₀ + β₁X₁ + … + βₚXₚ。

OLS 會選擇一組 β，使殘差平方和 Σ(yᵢ − ŷᵢ)² 盡量小。

Diagnostics 則是下一步：即使 SSE 已經最小，仍要問 residual 的形狀是否合理。

最重要直覺

假設真實關係是 y = x²，但你硬套 y = a + bx，OLS 仍會給你『最佳直線』；只是那條最佳直線仍可能系統性地錯。

因此：Optimization 解決『在你指定的模型家族中，哪一組係數最好』；Diagnostics 解決『你指定的模型家族本身是否合理』。

ŷ = β₀ + β₁x   ;   choose β to minimize Σ(yᵢ − ŷᵢ)²

OLS 給你『指定模型形式之內』的最佳係數；diagnostics 再判斷模型形式是否合理。

Page 2 — Contents of This Video

PDF 原頁截圖 — Page 2

PDF 列出的六個學習目標

四個 linear regression assumptions。

為什麼 assumptions 會影響 prediction。

用 diagnostic tools 檢查 assumptions。

Residual plot 如何判讀。

Outliers 與 high leverage points。

Assumptions violated 時可以怎樣處理。

整章工作流程

Step 1：Fit model，得到每筆 fitted value ŷᵢ。

Step 2：計算 residual eᵢ = yᵢ − ŷᵢ。

Step 3：畫 residual vs fitted、histogram、Q-Q plot。

Step 4：看有沒有 curve、fan、outlier、correlation / clustering。

Step 5：如果問題重大，再改 model specification、transform、split strategy 或 specialized model。

Residual 正負號要記清楚

e = y − ŷ。若 e > 0：真實值比預測高，模型 underpredict。

若 e < 0：真實值比預測低，模型 overpredict。

例如真實樓價 800k、預測 750k，residual = +50k；真實 700k、預測 750k，residual = −50k。

eᵢ = yᵢ − ŷᵢ

e > 0：underpredict；e < 0：overpredict

Page 3 — The Four Key Assumptions

PDF 原頁截圖 — Page 3

四個核心假設

Linearity：predictors 與 outcome 的 relationship 符合目前模型所假定的 linear form。

Independent errors：一個 observation 的 residual/error 不應由另一筆 observation 的 error 決定。

Constant variance (Homoscedasticity)：不同 prediction levels 的 residual spread 大致相同。

Normality of errors：residuals approximately normally distributed。

先分清 Error 與 Residual

理論模型：yᵢ = β₀ + β₁xᵢ + εᵢ，其中 εᵢ 是 population 中真正但不可直接觀察的 error。

實際 fit 完 model 後：eᵢ = yᵢ − ŷᵢ，eᵢ 是我們看得到、可以畫圖的 residual。

初學時可以把 residual 理解為『模型這一筆猜錯多少』；嚴格統計上，residual 是 error 的樣本估計。

四項數學直覺

Linearity：E(Y|X) 的 systematic part 能被目前 linear specification 捕捉。

Independence：不同 εᵢ 不應帶有未建模的相依關係。

Constant variance：Var(ε|X) = σ²，不因 prediction level 改變。

Normality：ε approximately follows N(0, σ²)；注意不是要求 X 或 Y 本身一定 normal。

yᵢ = β₀ + β₁xᵢ + εᵢ     →     eᵢ = yᵢ − ŷᵢ

ε 是理論 error；e 是 fit 完後可觀察的 residual。

記憶法 L-I-C-N  Linearity / Independence / Constant Variance / Normality

Page 4 — Linearity Assumption

PDF 原頁截圖 — Page 4

左圖：Linear Relationship ✓

散點大致沿著 straight-line trend，linear model 能抓住主要方向。

如果 residual 只是圍繞 0 隨機上下波動，表示模型沒有遺留下明顯的 systematic relationship。

右圖：Non-linear Relationship ✗

真實 relationship 是曲線，但模型只給直線。

結果不是『偶然錯』，而是在 low / middle / high X 區域出現有規律的 underprediction / overprediction。

這種 systematic mistake 會在 residual plot 中形成 curve。

為什麼嚴重？

如果真正 f(x) = x²，但模型指定 f(x) = a + bx，資料再多也只是估到一條更穩定的『錯誤形狀』。

這叫 model misspecification：模型形式沒有捕捉真正的關係。

重要延伸：Polynomial 仍可屬於 Linear Regression

模型 ŷ = β₀ + β₁x + β₂x² 在 X–Y 圖上是 curve，但對 coefficients β₀、β₁、β₂ 仍然是 linear。

所以『linear model』的 linear，重點是 parameters 進入模型的方式，而不是圖一定只能畫成直線。

True: y = x²    vs    Fitted: ŷ = a + bx

若 residual 出現有規律的 U-shape，表示直線模型漏掉 nonlinear structure。

ŷ = β₀ + β₁x + β₂x²

雖然圖可以是曲線，但對 β 仍是 linear，因此仍屬 linear regression framework。

Page 5 — Independence Assumption

PDF 原頁截圖 — Page 5

定義

Each observation’s error is unrelated to others。最直觀地說：知道 observation A 的 error，不應讓你能系統性預測 observation B 的 error。

通常比較合理的情況

不同家庭、彼此無連接的個體、不同市場區域等 observations，若抽樣設計也合理，independence 比較容易成立。

三種典型 violation

Repeated measurements：同一個人/entity 被量度多次。

Time series：相鄰時間點可能有 autocorrelation。

Spatial clustering：地理上接近的 observations 共享 neighbourhood / environment effects。

為什麼 repeated data 特別容易中招？

例如同一個人的 smart watch 每小時產生一筆紀錄。資料表有 1000 行，不代表真的有 1000 個獨立的人。

同一個人的生活習慣、身體狀態、裝置特徵會令多筆 records 互相關聯。

ML 實務：資料切分也會被影響

如果同一個人的 9AM record 在 train、11AM record 在 test，test set 未必真正獨立。

Grouped data 常用 group-aware split；time series 常使用 time-based split，而不是完全 random split。

Corr(eₜ, eₜ₋₁) ≠ 0

時間序列若 residual 有 autocorrelation，就不符合 errors independent 的直覺。

資料切分提醒  同一人/同一 entity 的 records 不應隨意同時散落 train 與 test；time series 也不宜任意打亂時間。

Page 6 — Constant Variance (Homoscedasticity)

PDF 原頁截圖 — Page 6

定義

Residuals should have equal spread across all prediction levels。

數學直覺：Var(ε|X) = σ²，error variance 不應隨 X 或 fitted value 系統性增大/縮小。

左圖：Constant Variance ✓

Residual 在 0 上下形成大致同樣寬度的 random cloud。

低 fitted value、中 fitted value、高 fitted value 的 vertical spread 沒有明顯擴張。

右圖：Increasing Variance ✗

Residual plot 由窄變闊，形成 fan / funnel。

這種情況稱為 heteroscedasticity：不同 prediction levels 的 uncertainty 不一樣。

Income 例子

低收入者可能收入結構相對穩定，prediction error 較小；高收入者可能包含 bonus、investments、business income，variation 更大。

因此高 fitted income 區域的 residual spread 可能顯著變寬。

為什麼會影響 reliability？

兩個 prediction 都是一個數字，但 uncertainty 可能完全不同。

例如 ŷ = 50k、典型誤差 ±2k，和 ŷ = 500k、典型誤差 ±200k；後者明顯更不可靠。

Var(ε | X) = σ²

Homoscedasticity：條件 variance 大致保持 constant。

一眼記圖  Residual fan / funnel → 想起 heteroscedasticity（non-constant variance）。

Page 7 — Normality of Errors

PDF 原頁截圖 — Page 7

PDF 的重點

Residuals 應該 approximately normally distributed。

但課程明確說：對 prediction 不是最 critical；ML application 中通常比 linearity 等假設次要；large samples 時更加不那麼關鍵。

Normal residual 長什麼樣？

Histogram 大致 bell-shaped、左右相對 symmetric、中心通常接近 0。

簡化可寫作 ε ~ N(0, σ²)。

Skewed residual 意味著什麼？

大量 residual 集中一邊，另一邊拖出 long tail，可能表示 outliers、skewed outcome、missing structure 或 transformation 有幫助。

最常見誤解

不是要求 X normal；也不是要求 Y 一定 normal。

課程談的是 errors / residuals 的分布。

為什麼對 prediction 沒那麼關鍵？

Least squares 的 point prediction 仍然可以在 residual 非完美 normal 時運作。

Normality 更直接關係到傳統統計 inference（例如 small-sample standard errors / confidence intervals / tests）的理論條件；本課程焦點偏 prediction。

ε ~ N(0, σ²)

課程說的是 errors/residuals approximately normal，而不是 X 或 Y 本身必須 normal。

Page 8 — Residual Plots: Primary Diagnostic Tool

PDF 原頁截圖 — Page 8

座標軸

X 軸：fitted values ŷᵢ。

Y 軸：residual eᵢ = yᵢ − ŷᵢ。

中央水平線：e = 0。

左上：Good Random Pattern ✓

點在 0 上下 random 分布，沒有明顯 curve、fan 或 isolated extreme points。

直覺：模型已經吸收主要 systematic pattern，剩下主要是 noise。

右上：Nonlinearity ✗

Residual 呈明顯 U-shape / curve。

低 fitted value 一種方向的錯、中間相反、高 fitted value 又回到原方向，表示模型持續有規律地犯錯。

常見對策：加入 polynomial / interaction / transformation，或改用更 flexible model。

左下：Heteroscedasticity ✗

Residual spread 隨 fitted values 增加而變大，形成 fan。

一眼記法：『扇形 = variance problem』。

右下：Outliers ✗

大部分 residual 靠近 0，但少量 points 遠離整體 cloud。

這些 observations 對 model prediction 錯得特別嚴重，應進一步查原因。

一張圖可以同時做很多診斷

Residual-vs-fitted 是本章最核心的 first-line diagnostic，因為一張圖能同時看到 nonlinearity、non-constant variance、outliers 等問題。

Residual plot:  x-axis = ŷᵢ    ;    y-axis = eᵢ = yᵢ − ŷᵢ

理想：圍繞 0 的 random cloud，沒有可預測的 pattern。

超高頻考點  Curve → nonlinearity；Fan → heteroscedasticity；isolated large residual → outlier。

Page 9 — Checking Normality of Residuals

PDF 原頁截圖 — Page 9

工具 1：Histogram

把 residuals 分箱畫出 frequency / density。

理想上大致 symmetric、bell-shaped、center around 0。

缺點：外觀會受 bin width 與 sample size 影響，因此單靠肉眼 histogram 不一定穩。

工具 2：Q-Q Plot

Q-Q = Quantile–Quantile。

它把 sample residual quantiles 與 theoretical normal quantiles 比較。

如果 residual distribution 與 normal distribution 很接近，點會大致貼住 diagonal line。

Quantile 可以怎樣理解？

先把 residuals 排序，再比較某些 percentile（例如 10%、25%、50%、75%、90%）的位置。

Normal distribution 也有相對應的 theoretical quantiles；Q-Q plot 就是把兩邊逐點配對。

怎樣看偏離？

整體貼線：normality reasonable。

兩端偏得特別厲害：可能有 heavy tails / outliers。

整體呈彎曲或一邊偏離：可能有 skewness。

真實資料幾乎不會每一點完美貼線；重點看是否 gross departure。

Sample residual quantiles  ↔  Theoretical Normal quantiles

Q-Q points 越接近 diagonal line，normality 越合理。

Page 10 — Detecting Outliers and Leverage Points

PDF 原頁截圖 — Page 10

Outlier：主要是 Y / residual 異常

PDF 定義：large residual、unusual Y value、far from regression line。

即 X 可能並不特別，但 Y 和模型預期差得很遠。

High Leverage：主要是 X 異常

PDF 定義：extreme predictor values / unusual X values。

因為它在 predictor space 離其他 data 很遠，所以有機會對 fitted line 產生 disproportionate influence。

最重要區分

Outlier = residual/Y 方向奇怪。

High leverage = predictor/X 方向奇怪。

一個 point 可以同時是兩者，也可以只屬於其中一種。

三個 case

Case A：X 普通，Y 極端 → outlier。

Case B：X 極端，但剛好沿著既有 trend → high leverage，但未必是 outlier。

Case C：X 極端，而且 Y 又遠離 trend → high leverage + outlier，通常最值得警惕。

延伸：Influence 是第三個概念

Influence 問的是：某 observation 實際令 fitted model 改變多少。

所以 high leverage 不等於一定 influential；如果它剛好落在原本趨勢線上，可能不會把 line 拉歪。

常見進階 diagnostic（非本頁原文）包括 leverage/hat value、studentized residual、Cook’s distance。

概念

主要『怪』在哪裡

核心判斷

Outlier

Y / residual

離 regression line 很遠

High leverage

X / predictor space

X value 遠離其他 observations

Influential point（延伸）

對 fitted model 的實際影響

刪掉它後 line / coefficients 改很多

Page 11 — When Assumptions Are Violated

PDF 原頁截圖 — Page 11

先接受一個現實

PDF 明確說：No dataset perfectly meets all assumptions — focus on major problems。

Diagnostics 不是追求『完美資料』，而是辨認會真正傷害模型的重大 violation。

Linearity violation

加入 polynomial terms，或使用更 flexible model。

例如真實關係像 x²，可由 ŷ = β₀ + β₁x + β₂x² 捕捉。

Non-constant variance

PDF 建議 transform Y，例如 log transformation。

直覺：有些資料的誤差是 percentage / multiplicative scale，而不是固定 absolute dollars；log transform 常可令 spread 更穩定。

Normality violation

對 prediction，尤其 large sample，往往不是最 critical。

但仍應查是否有 data entry error、outlier、special subgroup 或不合理的 scale。

Independence violation

使用能處理 time-series / clustering structure 的 specialized models 或方法。

重點不是『強行讓 data independent』，而是建模時承認 dependence。

本頁 key insight

課程直接指出：Linearity is most critical for prediction accuracy。

Violation

PDF 建議方向

Linearity

Add polynomial terms / flexible models

Non-constant variance

Transform Y，例如 log(Y)

Normality

Prediction 中 often not critical；查 outliers / transformation

Independence

Time-series / clustering specialized models

Page 12 — Focus on Predictive Accuracy

PDF 原頁截圖 — Page 12

這頁重新排序四個 assumptions 的重要性

Normality：not critical for predictive ability。

Independence：still important but often assumed。

Linearity：most critical；non-linear relationships hurt prediction。

Constant variance：會影響 prediction reliability。

為什麼 gross nonlinearity 最危險？

如果真實 E(Y|X) 的 shape 是 U-shaped，但模型只會畫 straight line，模型連 conditional mean 的主要形狀都估錯。

即使 residual 很接近 normal、樣本很大，wrong functional form 仍然會造成 systematic prediction error。

讀圖方式

頁面圖中真正 relationship 明顯呈 curved/U-shaped，而 linear prediction 幾乎是一條直線。

在不同 X range，直線有時高估、有時低估；因此錯誤是有 pattern，而非 random fluctuation。

不要過度解讀

這一頁不是說其他 assumptions 可以完全忽略。

尤其 time-series / repeated data 若 independence 被嚴重破壞，random train-test split 可能讓 test performance 失真。

Prediction-focused priority  最值得優先處理的是 gross nonlinearity，因為它直接讓模型系統性地估錯 relationship。

Page 13 — What We’ve Covered

PDF 原頁截圖 — Page 13

PDF 最終總結

Four assumptions：linearity、independence、constant variance、normality。

Diagnostic tools：residual plots、histograms、Q-Q plots。

辨認 outliers 與 high leverage points。

Assumption violated 時的常見處理方法。

理解 linearity 對 prediction accuracy 特別重要。

Practical approach：focus on major violations, not perfection。

把整章濃縮成六步

1. Fit model，得到 ŷ。

2. 算 residual：e = y − ŷ。

3. Residual vs fitted：找 curve / fan / outlier。

4. Histogram / Q-Q：看 residual normality。

5. 看 predictor space：找 high leverage；並思考 time / group dependence。

6. 針對 major issue 改模型，再重新 fit 與 diagnostics。

本章最值得記住的一句話

Residual 有 pattern，代表模型可能仍然漏掉本來應該解釋的 pattern。

整章一句話  Diagnostics = 檢查模型剩下的 residual 是否仍有可解釋的 structure。

14. 全章整合：House Price 從頭到尾例子

以下不是 PDF 額外新章節，而是把前 13 頁概念串成一次完整 workflow，方便真正理解。

Ŷ = 100,000 + 400 × Size

例：以房屋面積預測樓價。

假設 Size = 1,000 sq.ft.：

Ŷ = 100,000 + 400(1,000) = 500,000

若實際成交價 y = 550,000：

e = y − ŷ = 550,000 − 500,000 = +50,000

模型 underpredict 50,000。

情況 A：Residual 呈 U-shape

小屋 residual 多為正、中型屋多為負、大屋又多為正。

這不是 random miss，而是 systematic pattern → linearity problem。

可考慮加入 Size²：Ŷ = β₀ + β₁Size + β₂Size²。

情況 B：Residual 呈 Fan Shape

小屋誤差 ±10k，中型屋 ±50k，豪宅 ±300k。

Prediction level 越高，variance 越大 → heteroscedasticity。

PDF 建議方向之一：對 Y 做 log transformation。

情況 C：某一間屋 Y 極端

Size 看起來普通，但成交價遠高/低於 model trend。

Residual 很大 → outlier。

情況 D：某一間 Mansion 的 X 極端

大部分房屋 800–2,500 sq.ft.，突然出現 20,000 sq.ft.。

這是 high leverage；它是否 outlier 要再看 Y 是否離 regression trend 很遠。

情況 E：同一間房每月估值

Jan、Feb、Mar… 的 observations 來自同一 property，error 可能時間上 correlated。

這牽涉 independence；不能把它當作完全無關的 observations。

15. 考試 / 溫習版 Diagnostic Cheat Sheet

看到的現象

最先想到

原因

常見處理方向

Residual random cloud

大致正常

沒有明顯 systematic pattern

通常不用因圖本身改模型

Residual U-shape / curve

Linearity violation

模型漏掉 nonlinear structure

Polynomial / transformation / flexible model

Residual fan / funnel

Heteroscedasticity

Variance 隨 fitted value 改變

Transform Y（例如 log）

Histogram skew / Q-Q 偏線

Normality issue

Residual distribution 與 normal 不吻合

查 outliers / transformation

巨大 vertical residual

Outlier

Y 與模型預測差得很遠

Investigate observation

X 遠離其他 points

High leverage

Predictor value 極端

Check influence / validity

Residual 隨時間有規律

Independence issue

Autocorrelation

Time-aware modelling/splitting

同一人多筆資料

Independence issue

Clustered/repeated measures

Group-aware approach

16. 最後必背 10 句

Residual = actual − predicted = y − ŷ。

e > 0 代表模型 underpredict；e < 0 代表模型 overpredict。

好的 residual plot 應該像沒有 pattern 的 random cloud。

Curve → 想 linearity / model misspecification。

Fan / funnel → 想 heteroscedasticity / non-constant variance。

Normality 指 residual/error 的 distribution，不是 X 或 Y 必須 normal。

Q-Q points 貼近 diagonal line → residual normality 較合理。

Outlier 主要是 Y / residual 異常；high leverage 主要是 X 異常。

Assumptions 不必完美；重點是找 major violations。

Prediction-focused context 下，gross violation of linearity 特別直接傷害 accuracy。

最終 Mental Model  Fit → Residual → Plot → Diagnose → Fix → Refit → Recheck。不要只看 R² / MSE 就停止。

## Connections

[[Supervised Learning MOC]] · [[Supervised Learning - Module 2 MOC]] · [[Polynomial Regression and Model Flexibility]] · [[Simple Linear Regression Concepts]]

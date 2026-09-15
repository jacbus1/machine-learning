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

# Interpreting Results and Discussion

> [!info] Learning position
> Supervised Learning → Module 2 → Topic 3

## Interpreting_Results_and_Discussion_逐頁詳細分析

Interpreting Results & Discussion

Multiple Linear Regression：結果解讀、Feature Impact 與決策

PDF 12 頁逐頁詳細分析 + 影片口述補充 + 淺白例子 + 易錯點

一句話總結：  這一課不是再教你「怎樣 fit regression」，而是教你 fit 完之後怎樣讀係數、比較 feature、連到商業決策，以及知道甚麼時候不可以過度解讀。

資料依據：University of Colorado Boulder 課件 PDF（12頁）及同一課影片逐字稿；本筆記按 PDF 頁碼逐頁整理，並把影片額外口述內容放回最相關頁面。

0. 先建立整課脈絡：Build → Evaluate → Interpret → Decide

這一課位於 regression workflow 的後半段。前面你已經學過如何建立 multiple linear regression、如何用 least squares 找係數，以及如何用 R² 等指標看模型 fit 得好不好。現在要做的是把「數字」翻譯成「可理解的意思」。

ŷ = β₀ + β₁x₁ + β₂x₂ + β₃x₃

本課的核心工作：解讀每一個 β，然後把它們連到 real-world decision。

本課最重要的 4 層思考：  (1) 係數方向：正/負；(2) 每單位影響有多大；(3) 變數本身通常會變多少，所以總影響有多大；(4) 模型只是 association，不等於 causation。

本課使用的 housing model

ŷ = 100,000 + 110(Size) + 25,000(Location Quality) - 2,000(Age)

Intercept β₀ ≈ $100,000

Size β₁ ≈ $110 / sqft

Location Quality β₂ ≈ $25,000 / quality point

Age β₃ ≈ -$2,000 / year

「holding other variables constant」是甚麼？  例如 Size +1 sqft 時說價格平均 +$110，意思是比較兩間 Location Quality、Age 一樣，只差 1 sqft 的房屋。這是 multiple regression 解讀係數最關鍵的一句。

先看一個完整例子

假設房屋：Size = 1,500 sqft、Location Quality = 4、Age = 10 年。

ŷ = 100,000 + 110(1,500) + 25,000(4) - 2,000(10) = $345,000

所以模型預測價約為 $345,000。這個例子讓你看到：每個 coefficient 就像一個「價錢調整器」，最後全部加在一起。

讀完這份筆記，你應該識答

β₁ = 110 到底代表甚麼？為甚麼不可以直接說 Size 比 Location 不重要？

Location 的係數 $25,000 最大，為甚麼典型總影響反而可能是 Size 最大？

R² = 0.897 到底是甚麼，不是甚麼？

甚麼時候可考慮刪除 feature？為甚麼 raw coefficient magnitude 不能單獨決定？

Regression coefficient 為甚麼不能直接解讀為「因果」？

第 1 頁 — Interpreting Results & Discussion：本課定位

PDF 第 1 頁

這頁在講甚麼？

封面本身沒有新公式，但它標誌著學習目標由「建模」轉向「解讀」。也就是：模型已經 fit 完，下一步不是再計 β，而是問「β 告訴我甚麼？」

逐點拆解

Interpreting Results：把數學輸出翻譯成人話，例如「每多 1 sqft，預測房價平均增加 $110」。

Discussion：進一步討論這些結果對 buyer、seller、investor 有甚麼含義，以及有哪些限制。

這種思考不只適用於房屋；影片明確說，同一套步驟可套用到任何 linear regression application。

和前面課程的關係

前面 Least Squares / Multiple Linear Regression 解決「如何得到模型」；這一課解決「得到模型後如何解讀」。所以不是新的演算法，而是 analysis / communication skill。

本頁必記：  你可以把這一課想成：Regression 的「最後一公里」——由模型輸出走到決策。

第 2 頁 — Contents of This Video：整課五個任務

PDF 第 2 頁

這頁在講甚麼？

這一頁其實就是整課 roadmap。五個 bullet 可以整理成一條順序：讀係數 → 比較 feature → 看模型表現 → 轉成決策 → 加上限制。

逐點拆解

Interpret regression coefficients：先明白每個 β 的方向與單位。

Determine strongest effects：比較哪些 feature 對 price 的影響較明顯。

Use model performance to guide feature selection：不要只看「感覺重要」，還要看保留/移除 feature 對 prediction 的實際效果。

Inform investment decisions：把統計結果轉成 buyer / seller / investor 可採取的行動。

Limitations and cautions：最後檢查因果、資料範圍、線性假設與遺漏變數。

可以把五個任務記成 I-C-E-D-C

I = Interpret coefficients

C = Compare effects

E = Evaluate model / features

D = Decide / recommend

C = Caution / constraints

本頁必記：  最好的分析不會停在「R² 幾多」；它要回答：So what? 我應該做甚麼？又有甚麼不能說？

第 3 頁 — Regression Coefficients Recap：四個係數逐一讀

PDF 第 3 頁

這頁在講甚麼？

這頁把模型的四個估計係數重新列出。最重要不是背數字，而是懂得用「其他條件不變」去讀每一個係數。

逐點拆解

Intercept β₀ ≈ $100,000：當所有 x 都是 0 時的模型起點。課件把它描述成 very small house 的 baseline。

Size β₁ ≈ $110：Size 每增加 1 sqft，預測價格平均增加 $110，前提是 Location Quality 與 Age 固定。

Location β₂ ≈ $25,000：Location Quality 每提高 1 point，預測價格平均增加 $25,000，其他變數固定。

Age β₃ ≈ -$2,000：房齡每增加 1 年，預測價格平均下降 $2,000，其他變數固定。

用「差一個單位」思考

Δŷ = 110·ΔSize + 25,000·ΔLocation - 2,000·ΔAge

例如兩間屋只有 Size 相差 100 sqft，其他完全一樣：預測價差 = 100 × $110 = $11,000。

若 Location Quality 相差 2 points：預測價差 = 2 × $25,000 = $50,000。

Intercept 易錯點：  嚴格數學上，β₀ 是 Size=0、Location=0、Age=0 時的預測值。如果 Location scale 實際是 1–5，這個組合可能根本不存在，所以 intercept 有時只是數學錨點，不一定有強烈現實意義。

本頁必記：  正號 = x 增加時 ŷ 傾向增加；負號 = x 增加時 ŷ 傾向減少。係數同時包含「方向 + 每單位變化量」。

第 4 頁 — Coefficient Interpretation for Real Estate Strategy：raw coefficient 會誤導

PDF 第 4 頁

這頁在講甚麼？

圖表把 Location = +25,000、Size = +110、Age = -2,000 放在同一張 bar chart。視覺上 Location 好像壓倒性最大，但這正是本頁要你小心的地方：三個 feature 的單位完全不同。

逐點拆解

Location 的 1 unit 是「quality point」；Size 的 1 unit 是「1 sqft」；Age 的 1 unit 是「1 year」。

因此 $25,000 vs $110 並不是 apples-to-apples comparison。

如果 Size 一般差幾百至幾千 sqft，$110 會累積成很大的總價格差。

Key insight：per-unit impact（每單位）和 total impact（典型整段範圍）可以講出完全不同的故事。

為甚麼 raw bars 不可以直接排 importance？

想像「1 公里」和「1 米」都用同一個數字比較，單位不同就沒有直接可比性。Regression coefficient 也一樣：β 的數值大小會跟 feature 的 measurement unit 一起變。

極端例子：  如果 Size 由 sqft 改成 100 sqft 為 1 unit，係數就會由 110 變成 11,000；模型預測完全一樣，但 raw coefficient 大了 100 倍。這證明 raw β 大小不是純粹的「importance」。

本頁必記：  不要見 β 數字大就立即說「最重要」。先問：它的 1 unit 是甚麼？這個變數現實中通常會變幾多 unit？

第 5 頁 — Coefficient Magnitude and Model Performance：把係數乘上典型變化範圍

PDF 第 5 頁

這頁在講甚麼？

這頁是全課最值得掌握的一頁。做法非常簡單：Total typical impact ≈ coefficient × typical change。這一步把不同單位的係數轉成較有實際意義的比較。

逐點拆解

Size：1,500 sqft × $110/sqft = +$165,000。

Age：30 years × -$2,000/year = -$60,000。

Location：3 points × $25,000/point = +$75,000。

所以按這組「典型差距」計，Size 的總影響最大，即使它的 per-unit coefficient 只有 110。

三個 impact 計算

Size: 1,500 × 110 = +165,000

Location: 3 × 25,000 = +75,000

Age: 30 × (-2,000) = -60,000

來源一致性注意：  影片口述在講 1,500 sqft × $110 時說成約 $150,000，但正確算術是 $165,000，而且 PDF 第5頁亦寫 $165,000。這裡以公式與投影片為準。

本頁必記：  比較 feature 的 practical impact 時，常用概念是 |β| × meaningful range，而不是只排 |β|。

第 6 頁 — Understanding Scale：左圖與右圖為甚麼排名反轉

PDF 第 6 頁

這頁在講甚麼？

這一頁用兩個並排 bar chart 把上頁概念視覺化。左圖看每 1 unit；右圖看典型總變化。兩種圖回答的是不同問題。

逐點拆解

左圖（Per-Unit Impact）：Location +$25k 最大；Age -$2k；Size +$110 最小。

右圖（Total Typical Impact）：Size +$165k 最大；Location +$75k；Age -$60k。

「最大係數」與「最大現實影響」不一定是同一 feature。

影片額外補充 standardized features：把每個變數轉成以 standard deviation 為單位，就能更自然地比較不同 scale 的 feature。

影片額外補充：Standardization

z = (x - mean(x)) / SD(x)

把不同 feature 轉成「距離平均值幾多個 standard deviations」。

標準化後，1 unit 不再是 1 sqft / 1 year / 1 quality point，而是「1 個 standard deviation」。這樣比較 coefficient magnitude 會合理得多。

直覺：  原本 Size 的單位很細（1 sqft），Location 的單位很粗（1 point）。Standardization 就像把大家換成同一把尺。

本頁必記：  Scale 是 regression coefficient interpretation 的核心。若 feature units 不同，raw β 不能直接當 importance ranking。

第 7 頁 — Should We Keep All Features?：保留 feature 的理由與 R²

PDF 第 7 頁

這頁在講甚麼？

課件在這個 toy model 的結論是保留 Size、Location、Age，因為三者都提供有意義的訊號，且所有 feature 一起時 R² = 0.897。

逐點拆解

R² = 0.897 表示模型在這份資料中解釋了約 89.7% 的 house-price variation；不是「89.7% 預測正確」。

Location：最高 per-unit impact。

Size：每 sqft 看似細，但 cumulative effect 大。

Age：提供 depreciation（折舊/房齡）資訊。

房價本來就是 multifactorial，所以同時看多個因素較合理。

R² = 0.897 的正確語言

R² = 1 - SS_res / SS_tot

可讀成：「在這份資料和這個模型設定下，大約 89.7% 的 target variation 被模型所解釋。」不要寫成「模型 89.7% accurate」；regression 的 R² 不是 classification accuracy。

進階補充（非投影片原文）：  真實 feature selection 最好比較 validation/test performance（例如移除某 feature 後 R²、RMSE 是否變差），也可配合 regularization、domain knowledge、uncertainty 等。單看 training R² 或 β 大小並不足夠。

本頁必記：  保留 feature 的核心不是「每個 β 都非零」而已，而是它是否帶來可解釋、可重複的 predictive value。

第 8 頁 — Why Coefficient Magnitude Guides Feature Selection：signal vs noise

PDF 第 8 頁

這頁在講甚麼？

兩張 scatter plot 想表達：feature 與 target 若有清晰線性關係，regression line 能捕捉到 predictive signal；若係數接近 0、關係很弱，該 feature 可能貢獻有限。

逐點拆解

左圖 Size：點大致沿上升線排列，表示 Size 與 price 有強的正向 predictive relationship。

右圖 Age：整體向下，但散點較多，表示負向 signal 仍存在，但噪音較大。

影片說：若某些係數 near 0，可能考慮 drop；在本例三個 feature 都有 meaningful contribution。

但「raw coefficient magnitude」受單位影響，因此真實 feature selection 不應只用 raw β 大小。

如何讀兩張 scatter plot

先看 direction：左圖正斜率；右圖負斜率。

再看 points 離 regression line 有幾散：越貼線，線性 signal 越清楚。

最後才看 coefficient；但不同 x-axis 單位時，不要用 raw slope 直接跨圖比較 importance。

圖標題的語意要小心：  左圖寫「Large Coefficient (Size)」、右圖寫「Moderate Coefficient (Age)」，較適合理解為 strong vs moderate predictive signal 的教學圖示。若按本課 raw coefficients 的絕對數值，|-2000| 其實大於 |110|；所以跨單位不能只按數字比較。

本頁必記：  這頁真正要學的是 signal/noise 思維，而不是「數字最大的 β 一律最重要」。

第 9 頁 — Strategic Real Estate Insights：由 β 變成商業建議

PDF 第 9 頁

這頁在講甚麼？

這頁示範如何把統計語言轉成 stakeholder 語言。對不同角色，重點不同：buyer 看購買價值，seller 看 marketing，investor 看 value retention / ROI。

逐點拆解

For buyers：課件建議 prioritize location quality，因為 location 的 per-point value impact 很高。

For sellers：marketing 時突出 superior location features。

For investors：較新、location 好的物業在這個簡化模型中有較好的 value retention。

Location $25k/point：可粗略量化較好 neighborhood 的 price premium。

Size $110/sqft：可作 renovation / expansion ROI 的其中一個估算輸入。

Age -$2k/year：提供 depreciation 的量化概念。

一個 decision breakdown 例子

比較 House A 與 House B：B 比 A 大 500 sqft、Location 高 1 point、而且新 10 年。

Predicted price difference = 500(110) + 1(25,000) + (-10)(-2,000) = $100,000

Size 貢獻：+$55,000

Location 貢獻：+$25,000

新 10 年（Age 少 10）：+$20,000

這就是 regression 很適合 discussion 的地方：不只告訴你差 $100k，還可以拆解差額從哪裡來。

本頁必記：  Decision recommendation 應該由模型結果出發，但不能把 association 寫成保證或因果。

第 10 頁 — Cautions in Interpretation：四個不能忘記的限制

PDF 第 10 頁

這頁在講甚麼？

這一頁是在防止你「模型 fit 得好就過度自信」。R² 高、係數漂亮，都不代表模型在任何地方、任何時間、任何房屋都一定有效。

逐點拆解

Correlation ≠ Causation：β 顯示的是條件式 association，不自動代表改變 x 會造成 y 改變。

Range limitations：模型只在訓練資料涵蓋的 size/age/location 範圍較可信；超出範圍叫 extrapolation，風險較高。

Linear assumption：模型假設每多 1 unit 的邊際效果固定；極端區域可能不是直線。

Missing variables：bedrooms、bathrooms、garage 等未進模型，可能影響 prediction，也可能改變現有係數。

Best practice：統計分析要配合 local market knowledge。

四個限制的淺白例子

Correlation ≠ causation：好地段房價高，可能同時因學區、交通、收入結構等；不能單憑 β 說「提高 location score 會造成房價上升」。

Range：若訓練資料最大 3,000 sqft，用直線直接預測 10,000 sqft mansion 就是 extrapolation。

Linear：1,000→1,100 sqft 的價值增幅未必和 5,000→5,100 sqft 完全一樣。

Missing variables：若 bedrooms 同 Size 強烈相關，漏掉 bedrooms 可能令 Size coefficient 同時吸收部分 bedrooms effect。

本頁必記：  Interpretation 必須和 scope 一起說：模型在哪些資料、哪些條件、哪些假設下成立。

第 11 頁 — Summary: From Data to Insights：完整 regression workflow

PDF 第 11 頁

這頁在講甚麼？

這頁把前面所有步驟收斂成「由 data 到 insight」。課件強調 regression 不只是 prediction，也可以幫我們理解哪些變數與 target 有關。

逐點拆解

Build：建立 multiple linear regression。

Evaluate：R² = 0.897，檢查 fit / predictive quality。

Interpret：把 β 變成 size、location、age 的實際語意。

Recommend：把結果轉成 buyer / seller 的 data-driven suggestions。

課件寫「location as highest impact feature」；精確理解應連同前頁語境：Location 是最高 per-unit coefficient，而 Size 在典型範圍下的 total impact 更大。

一個要主動化解的表面矛盾

第11頁說「Identified location as highest impact feature」，但第5–6頁明確計到 Size 的 typical total impact = $165k，高於 Location 的 $75k。最一致的讀法是：

Location = highest per-unit coefficient / per-point impact。

Size = largest total impact over the example typical range。

考試/作業最好寫法：  “Location has the largest per-unit coefficient, whereas size can have the largest cumulative impact across its typical range.” 這樣就不會混淆兩種 importance。

本頁必記：  一句最好記的版本：Regression = predict + explain associations + support decisions。

第 12 頁 — What We’ve Covered：最後把技能串成一條線

PDF 第 12 頁

這頁在講甚麼？

最後一頁不是新增內容，而是確認你已掌握一個可重複使用的分析框架。這個框架可直接搬去其他 supervised-learning regression 問題。

逐點拆解

Interpret coefficients：讀方向、單位、holding others constant。

Compare relative importance：先處理 scale，再談重要性。

Feature selection：看 feature 是否帶來 predictive signal / performance improvement。

Strategic recommendations：把 model output 翻成 stakeholder 可用的語言。

Limitations：因果、範圍、線性、遺漏變數。

完整流程：build → evaluate → interpret → decide。

可直接套用到任何 regression 的 discussion 模板

1. Model performance：先報 R² / RMSE 等，說明整體表現。

2. Coefficients：解釋方向、單位、holding others constant。

3. Relative effect：考慮 scale / typical range / standardization。

4. Practical meaning：把結果連到真實決策。

5. Limitations：因果、資料範圍、線性、遺漏變數。

6. Next step：需要更多 data、validation、其他 features 或更合適模型。

本頁必記：  如果你做 assignment，最完整的 discussion 不是只寫係數，而是：結果 → 解釋 → 比較 → 實務意義 → 限制。

13. 全課總整理：你真正要記住的 10 個 concepts

1. Multiple regression coefficient: βj = xj 增加 1 unit 時，ŷ 的平均改變量，其他 predictors 固定。

2. Sign: β > 0 正向；β < 0 負向。

3. Unit: 係數永遠要連同單位讀：$/sqft、$/point、$/year。

4. Intercept: 所有 x=0 時的 baseline；可能只是一個數學錨點。

5. Per-unit impact: 看「每 1 unit」的 effect。Location 在本例最高。

6. Total typical impact: 看 β × typical change。Size 在示例範圍最高。

7. Standardization: 把 features 換成 common scale，較容易比較 coefficient magnitudes。

8. R²: 解釋 target variance 的比例，不是 classification accuracy。

9. Feature selection: 不要只看 raw β；要看 scale、validation performance、signal/noise。

10. Caution: Association ≠ causation；注意 range、linearity、missing variables。

14. 最後用一題把整課串起來

Question：如果某 house model 的係數與本課相同，House B 比 House A 大 800 sqft、Location 高 2 points，但舊 15 年，模型預測 B 比 A 貴多少？

Δŷ = 800(110) + 2(25,000) + 15(-2,000)

= 88,000 + 50,000 - 30,000 = +$108,000

Interpretation：在其他模型條件相同的比較下，B 的較大面積和較好 location 合共增加 $138k，但較高房齡扣回 $30k，所以模型估計 B 約貴 $108k。

Discussion 寫法：  不要停在答案 $108k。再補一句：這是模型估計的 association-based difference，受訓練資料範圍、線性假設及未納入因素影響。

15. 30 秒記憶版

β 告訴我每 unit effect；但 units 不同，所以 raw β 不能直接比 importance。要看 typical range 或 standardize。R² 告訴我整體解釋力，但不代表因果。最後把結果轉成 decision，同時交代 limitations。

BUILD → EVALUATE → INTERPRET → DECIDE

16. 資料來源、一致性說明與自我檢查

Primary source：Interpreting Results & Discussion PDF（12頁），University of Colorado Boulder。

Supplement：同課影片逐字稿，用來補充 “holding variables constant”、standardization、near-zero coefficients、跨領域應用等口述內容。

已標示一個來源算術差異：影片口述 1,500 × 110 約為 $150,000；PDF 與正確算術為 $165,000。

「進階補充」段落為了幫助理解而加入的一般 regression 知識，已與課件原意分開標示。

完成後 5 題自我檢查

Q1. βSize = 110 應該怎樣用完整一句話解釋？

Q2. 為甚麼 Location 的 coefficient 最大，但 Size 的 typical total impact 可以更大？

Q3. R² = 0.897 是否等於模型有 89.7% accuracy？

Q4. 若某 feature coefficient near 0，是否一定立即刪除？你還會檢查甚麼？

Q5. 為甚麼 coefficient 不能直接證明 causation？

自我檢查答案方向：  Q1 要有 holding others constant；Q2 要講 scale / typical range；Q3 不等於 classification accuracy；Q4 還要看 validation performance、scale、domain meaning；Q5 regression 在此建立的是 association，仍可能有 confounding / omitted variables。

如果以上 5 題你可以不用看筆記答出來，這一課的核心已經真正掌握。

## Connections

[[Supervised Learning MOC]] · [[Supervised Learning - Module 2 MOC]] · [[Fitting a Linear Model and Assessing Fit]] · [[Multiple Linear Regression]]

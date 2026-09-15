---
course: Supervised Learning
module: 3
status: curated
tags:
  - supervised
  - module-3
  - machine-learning
publish: true
---

# Data Pre-Processing

> [!info] Learning position
> Supervised Learning → Module 3 → Topic 2

## Data_Pre-Processing_完整分析筆記

Data Pre-Processing

Classification Methods｜完整逐頁分析筆記

VIDEO + PDF + TXT transcript 交叉整理

教材 PDF 封面（第 1 頁）

重點：Scaling → Encoding → Split → Pipeline → Avoid Leakage

0. 本筆記如何分析三個來源

本文件以 PDF 9 頁為主架構，逐頁對照影片畫面與 TXT 逐字稿。PDF 提供投影片內容；TXT 是影片講者的口語內容；影片本身則用來確認畫面出現順序、講者覆蓋畫面，以及每張投影片的大約時間位置。

來源使用原則

「教材內容」只陳述 PDF / transcript 實際支持的內容；為了幫助理解而加入的技術細節，會明確標成「延伸解析」。如果教材口語有容易令人誤解的說法，也會另行標註，而不會偷偷改寫成另一套內容。

影片快速資訊

影片長度：約 10 分 52.7 秒（652.7 秒）。

影片解析度：428 × 240，30 fps；音訊為 AAC。

PDF 共 9 頁；影片實際播放時，第 8 頁「Avoiding Data Leakage」沒有獨立顯示出來，但講者有口頭講解 leakage。

影片 × PDF 畫面對照時間

PDF頁

主題

影片畫面時間（約）

交叉分析

1

Data Pre-processing

00:08–00:25.6

講者人物覆蓋在封面投影片上

2

Contents

00:25.6–00:54.5

課程地圖

3

Student Success Challenge

00:54.5–01:48.2

用學生資料說明 raw data 問題

4

Feature Scaling

01:48.2–04:35.5

影片停留最久，詳細講 Z-score / Min-Max / KNN / LR

5

Categorical Encoding

04:35.5–06:17.7

One-hot encoding

6

Proper Data Splitting

06:17.7–08:41.6

60/20/20、stratify、test set 不可碰

7

Preprocessing Pipelines

08:41.6–10:12.5

Pipeline + leakage 口頭說明

8

Avoiding Data Leakage

未獨立顯示

PDF 有此頁；影片直接由第 7 頁跳到第 9 頁

9

What We’ve Covered

10:12.5–10:52.7

總結

時間為依影片畫面轉場估算，目的是方便回看，不代表正式字幕時間碼。

整個單元的一條主線

一句話核心

Raw data 不能直接丟入分類器：先把數值尺度處理好、文字類別轉成模型可讀的數字、正確分割資料，再把所有 preprocessing 封裝成只由 training data 學習的 pipeline，最後才用 test set 做一次真正的最終評估。

1. PDF 第 1 頁｜Data Pre-processing

PDF 第 1 頁

PDF 在說什麼

這一頁是單元封面：主題是「Data Pre-processing」，隸屬 Classification Methods。講者為 Daniel E. Acuna，University of Colorado Boulder。

影片補充

影片開頭先出現一個不在 PDF 內的課程品牌片頭，之後大約在 00:08 開始顯示這張封面。此時講者本人被合成在投影片前方，邊說明「preprocessing 是任何 classification model、其實任何 model 都很關鍵的一步」。

這頁真正要建立的觀念

Preprocessing 不是「模型訓練之後的整理」，而是模型訓練之前的資料準備。

它同時影響 performance（表現）、interpretability（可解釋性）及 evaluation fairness（評估公平性）。

本單元特別以 classification 為例，但講者一開始也提醒：這些原則很多可泛化到其他 ML 模型。

記憶句

模型不是只學「數據裡的規律」，也會受到「數據怎樣被表示」影響。Preprocessing 就是先把表示方式整理好。

2. PDF 第 2 頁｜Contents of This Video

PDF 第 2 頁

PDF 六個學習目標

Why preprocessing is essential for classification

Scaling numeric features for fair comparison

Encoding categorical variables

Proper train / validation / test splits

Building preprocessing pipelines

Avoiding data leakage

影片如何鋪陳

講者把這六項串成一個因果鏈：原始資料的尺度與格式不一致 → 模型可能偏向某些特徵或根本無法處理文字欄位 → 所以要 scaling / encoding；但 preprocessing 本身若使用了 test data 的資訊，又會造成 leakage → 因此需要正確 split 和 pipeline。

建議你如何記這六項

六個字：Scale → Encode → Split → Pipe → No Leak

可把「why preprocessing matters」視為開場原因，而真正操作核心就是：數值 Scale、類別 Encode、資料 Split、流程 Pipeline、最後確保 No Leakage。

3. PDF 第 3 頁｜The Student Success Dataset Challenge

PDF 第 3 頁

PDF 列出的 raw data 問題

Mixed feature scales：Study hours 0–40、GPA 0–4、Attendance 0–1。

Categorical variables：Major、study time preference、study space。

Missing values：部分學生沒有提供所有 features。

Different units：hours、percentages、counts 混在一起。

Without preprocessing：模型可能把注意力放錯地方，甚至無法正常訓練。

影片中的學生例子

講者把學生是否 Pass / Fail 當作分類目標，輸入特徵包括 self-study hours、group study hours、library time、attendance rate、assignments on time、forum participation、previous GPA 等。這個例子故意混合不同單位、不同範圍與文字類別，正好示範 preprocessing 為何必要。

為何「數值範圍大」會造成問題

以投影片上的例子，Study Hours 大約 5–40（mean≈22），Attendance 約 0.4–1.0（mean≈0.7）。如果模型以距離衡量「兩位學生有多相似」，Study Hours 的數值差可以是十幾、二十，而 Attendance 的差通常小於 1；沒有 scaling 時，前者很容易主宰距離。

非常重要的精確化

Scaling 是令「數值尺度」公平，而不是強迫每個 feature 對預測「同樣重要」。如果 Attendance 真正比 Study Hours 更有預測力，模型仍然可以學到它更重要；scaling 只是避免單位與量綱先天搶走影響力。

延伸解析：不同模型對 scaling 的敏感度

KNN / K-means / SVM(RBF) 等以距離或幾何關係為核心的模型：通常很敏感。

Logistic Regression / Linear models：數學上可在未 scaling 下工作，但 optimization、regularization 與 coefficient comparison 會受尺度影響。

Decision Tree / Random Forest / Gradient-boosted trees：通常對單調縮放不敏感，因為主要依靠 threshold split。這點是延伸知識，原投影片沒有展開。

4. PDF 第 4 頁｜Feature Scaling: The Foundation

PDF 第 4 頁

4.1 Standardization（Z-score）

x_scaled = (x − μ) / σ

μ = training feature mean；σ = training feature standard deviation

教材的意思是：先看一個數值距離該 feature 的平均值多遠，再把距離改用「幾個標準差」表示。標準化後，該 feature 在 training data 中通常會以 0 為中心，standard deviation 約為 1。

手算例子：Study Hours

假設 training data 的 Study Hours 平均 μ=22、小時標準差 σ=8；某學生 x=30 小時：

z = (30 − 22) / 8 = 1.0

代表這位學生比 training mean 高 1 個 standard deviation。

手算例子：Attendance

假設 Attendance 平均 μ=0.70、σ=0.10；某學生 x=0.80：

z = (0.80 − 0.70) / 0.10 = 1.0

雖然原始單位完全不同，兩者標準化後都可用「偏離平均幾個 σ」比較。

教材口語需要補一個精確化

影片把 standardization 描述成「make it similar to a normal distribution」。更精確地說：Z-score 只會做 center + scale，不會把任意分布自動變成 normal distribution。若原始變數本身是 normal，標準化後才會是 standard normal；若原始分布偏斜，標準化後仍會偏斜。

4.2 Min-Max Scaling

x_scaled = (x − x_min) / (x_max − x_min)

常見目標區間為 [0, 1]

它不是問「離平均幾個標準差」，而是問「你位於目前最小值與最大值之間的哪個位置」。training data 的 minimum 會變成 0，maximum 會變成 1。

手算例子

Study Hours 若 training min=5、max=40，學生 x=30：

(30 − 5) / (40 − 5) = 25/35 ≈ 0.714

Attendance 若 training min=0.4、max=1.0，學生 x=0.8：

(0.8 − 0.4) / (1.0 − 0.4) = 0.4/0.6 ≈ 0.667

4.3 為何 KNN 特別需要 scaling

KNN 會計算新資料點與舊資料點的 distance。若 Study Hours 以 0–40 表示，而 Attendance 以 0–1 表示，那「多 10 小時」在距離公式裡的貢獻，可能遠高於 attendance 相差 0.2。這不一定代表 Study Hours 更重要，只是因為單位大。Scaling 讓每個維度的數值變得可比較。

4.4 為何 Logistic Regression 也受益

影片指出兩個方向：一是 gradient descent 更容易在不同維度以相近速度收斂；二是 coefficient / weight 更容易比較。這對帶 regularization 的 logistic regression 尤其重要，因為 penalty 是直接作用在 coefficients 上；若 features 尺度差異很大，係數大小本身也會被單位影響。後半句為延伸解析。

Z-score vs Min-Max：怎樣記

方法

核心問題

結果尺度

常見提醒

Z-score

離平均值幾個 σ？

mean≈0, std≈1

對 outlier 仍可能敏感

Min-Max

位於 min 與 max 的哪個位置？

通常 0–1

非常受 min/max 與 outlier 影響

5. PDF 第 5 頁｜Encoding Categorical Variables

PDF 第 5 頁

問題：文字類別不能直接當普通數字

教材例子包括 Major = Engineering / Business / Liberal Arts / Science、Study Time = Morning / Afternoon / Evening / Night，以及 Study Space = Library / Dorm / Coffee Shop / Home。許多模型需要數值輸入，因此要把 category 轉換成數值表示。

One-Hot Encoding 的做法

不是把 Engineering=1、Business=2、Liberal Arts=3、Science=4，因為那樣會偷偷創造「1<2<3<4」的順序。One-hot 是替每一個 category 建立一個 0/1 欄位。

學生 Major

Engineering

Business

Liberal Arts

Science

Engineering

1

0

0

0

Business

0

1

0

0

Science

0

0

0

1

教材列出的三個 benefits

No artificial ordering between categories：不製造假的大小次序。

Each student gets exactly one “1” per categorical feature：若每個人只屬於一個 major，該組 one-hot 欄會只有一格是 1。

Models can learn different weights for each category：模型可分別學 Engineering / Business / Science 等類別的權重。

延伸解析：兩個常見實務問題

Unknown category：部署時可能出現 training 沒看過的新類別，因此 encoder 要有「遇到 unknown 不報錯」的策略。

Dummy variable trap / multicollinearity：對某些線性模型，可選擇 drop 一個 reference category；但是否需要 drop 要視模型與實作而定。原影片沒有討論。

記憶句

Category 不等於 ordinal number。沒有天然大小順序的文字類別，最直觀的安全做法就是「一類一欄、0/1 表示」。

6. PDF 第 6 頁｜Proper Data Splitting

PDF 第 6 頁

6.1 Three-Way Split

Training Set (60%)：fit the model。

Validation Set (20%)：tune hyperparameters，例如 regularization strength 或 KNN 的 k。

Test Set (20%)：最後一次 final performance evaluation。

影片特別說 60/20/20 只是 example，不是所有問題都必須固定用這個比例。概念比比例更重要：不同資料分工，不讓 final test 參與模型選擇。

6.2 為何 test set 要像「鎖在保險庫」

講者直接用「leave it out in a lock vault, and don’t touch it」形容 test set。原因是：只要你看過 test performance 後再調模型、改 feature、改 preprocessing，test set 就已經間接成了 training/validation 的一部分，最後報告的成績就會偏樂觀。

6.3 Stratify 是什麼

若原始資料中 Pass:Fail = 80:20，stratified split 會盡量令 train、validation、test 都維持接近 80:20。這對 classification 很重要，否則某個 split 可能偶然只有很少 minority class，令評估不穩。

6.4 「Split BEFORE preprocessing」要怎樣精確理解

教材的關鍵規則是先 split，再做 preprocessing。實務上最重要的是：任何會從資料「學參數」的步驟，例如 mean/std、min/max、imputation statistics、feature selection criterion，都只能在 training data 上 fit，再把同一套參數 apply 到 validation / test。

錯誤 vs 正確

錯：先對全部資料算 mean/std → 再切 train/test。正確：先切 train/test → 只用 train 算 mean/std → 用 train 的 mean/std 去 transform test。

6.5 公平比較模型

PDF 另外提醒「Use same splits across all models for fair comparison」。如果 Model A 和 Model B 用不同 test samples，很難知道成績差異來自模型本身，還是來自資料難度不同。

7. PDF 第 7 頁｜Preprocessing Pipelines

PDF 第 7 頁

PDF 的 pipeline

投影片寫成：Raw Student Data → Train/Val/Test Split → Preprocessing → Model Training → Clean Data Ready for ML。核心意圖是：先 split，再用一致的 preprocessing，之後再訓練模型。

版面文字的小問題

「Model Training → Clean Data Ready for ML」在邏輯順序上容易令人誤解：通常應是「Clean/Transformed Data Ready for ML → Model Training」。因此更合理的流程是：Raw → Split → Fit/Transform Preprocessor → Model Training → Validation → Final Test。這是對投影片呈現順序的分析，不是更改教材核心觀念。

Key preprocessing steps

Scale numeric features

Encode categorical variables

Handle missing values

Feature selection

影片對 missing values 舉的例子是「removing those data points」。教材沒有在此單元深入比較 deletion、mean/median imputation、model-based imputation 等方法，因此本文件不把其他方法當成課程原內容。

Pipeline 的四個 benefits

Fit Preprocessor (Training Only)：scaler / encoder 等只由 training data 學參數。

Transform All Splits：validation 和 test 使用 training 已學到的同一套轉換。

Consistent Processing：training 與 deployment 套用同樣步驟，避免人工漏步。

Prevents Data Leakage：test data 不影響 preprocessing decision。

一個最重要的操作分別：fit vs transform

動作

做了什麼

應在哪裡做

fit

學 mean/std、min/max、categories、imputation statistics 等

Training only

transform

使用已學參數把資料轉換

Train / Validation / Test / Production

最容易考的句子

Test set 可以被 transform，但不能被 fit。也就是：你可以用 training scaler 去縮放 test；你不能讓 scaler 先看 test 再決定 mean/std。

8. PDF 第 8 頁｜Avoiding Data Leakage

PDF 第 8 頁

影片 / PDF 差異

這張第 8 頁存在於 PDF，但影片畫面實際由第 7 頁直接跳到第 9 頁。講者仍然在第 7 頁畫面期間口頭說明 data leakage，所以這一頁是「PDF 有、影片未獨立顯示」的內容。

8.1 什麼是 Data Leakage

教材的核心定義：當 test data 的資訊透過 preprocessing 或 model decision 流回 training / validation 過程，就發生 leakage。你以為模型「從未見過」test，其實它已經透過統計量、feature selection 或 encoding 間接見過。

8.2 PDF 三個 leakage examples

Scaling using all data：用全部資料計算 scaling statistics，test 的 mean/std/min/max 影響 preprocessing。

Feature selection on full dataset：先看完整 dataset（包含 test）才決定選哪些 features，等於讓 test performance 幫你挑特徵。

Target encoding with all data：encoding 使用了 test outcomes / target information。

8.3 Consequences

Overly optimistic performance estimates：成績虛高。

Models that fail in real deployment：真正新資料沒有那種「偷看答案」的優勢，所以部署表現掉下來。

Invalid scientific conclusions：如果評估方法不獨立，研究結論也不可靠。

8.4 75% vs 85% 要怎樣讀

PDF 用「Proper Validation ≈ 75%」和「Data Leakage ≈ 85%」作示意，重點是 leakage 可能把 accuracy 假性抬高。這不是影片提供的一組真實實驗數據，應視為概念化例子，而不是固定會差 10 percentage points。

Leakage 的本質

不是「test set 被直接拿去 fit model」才叫 leakage。只要 test 的任何資訊影響了 feature engineering、normalization、selection、hyperparameter decision 或 threshold decision，都可能污染最終評估。

9. PDF 第 9 頁｜What We’ve Covered

PDF 第 9 頁

六個總結點

Preprocessing 的目的之一是公平比較不同 feature scales。

Feature scaling：standardization + min-max scaling。

Categorical variables：one-hot encoding。

Data splitting：train / validation / test 各司其職。

Robust preprocessing pipelines：確保流程一致、training-only fit。

Avoid data leakage：保護 test set 的獨立性。

影片結尾的重點

講者最後強調，這些步驟不只是「提高 accuracy 的技巧」，也是讓 model evaluation 更公平的基本紀律。換句話說，本單元的最終目標不是追求一個最好看的分數，而是得到一個可信、可重現、能反映 deployment 現實的分數。

這一課真正的核心

Preprocessing = 讓資料可比較、可輸入；Splitting + Pipeline = 讓評估可信；No Leakage = 讓你的 accuracy 是真的，而不是被 test 資訊偷偷幫高。

10. 全單元整合｜從 Raw Data 到可信的 Classification Model

10.1 正確工作流

1

Raw data — 數值 + categorical + missing values

2

Split — Train / Validation / Test；classification 可 stratify

3

Fit preprocessing on Train — scaler、encoder、imputer、feature selection 只看 training

4

Transform — 用 training 學到的規則轉 train / val / test

5

Fit model — 只用 processed training data 訓練

6

Tune on validation — 比較 hyperparameters / model choices

7

Freeze decisions — 選定 preprocessing + model + hyperparameters

8

Evaluate once on test — 只做最終 performance report

9

Deployment — 新資料走同一套已 fit 的 preprocessing → model

10.2 一個完整學生例子

假設你要預測 Pass / Fail，features 有 StudyHours、GPA、Attendance、Major、StudySpace。你不能先把全 dataset 的 StudyHours 算 mean=22、std=8 再切 test，因為 22 和 8 已經含 test students 的資訊。

先 stratified split 出 training / validation / test。

只在 training 算 StudyHours / GPA / Attendance 的 scaling parameters。

只在 training 學 Major / StudySpace 有哪些 categories。

training：fit + transform；validation/test：只 transform。

用 validation 決定 Logistic Regression 的 regularization 或 KNN 的 k。

決定完成後，不再調整任何東西，最後只看一次 test performance。

你應該看到的思維改變

不要把 preprocessing 當成「Excel 清理」。在 machine learning 裡，很多 preprocessing 其實也是一種 learning：它會從資料估計參數。因此它也必須遵守 train/test isolation。

11. 公式與考試記憶版

11.1 Z-score

z = (x − μ) / σ

x：原始數值

μ：training feature mean

σ：training feature standard deviation

z=0：等於平均；z=+1：高 1 個 standard deviation；z=−1：低 1 個 standard deviation。

11.2 Min-Max

x_scaled = (x − x_min) / (x_max − x_min)

training min → 0；training max → 1。

validation/test 可能出現 <0 或 >1，因為它們可能比 training min/max 更極端。這是延伸解析，並不表示 scaler 錯了。

11.3 One-Hot

一個沒有天然順序的 category → 多個 binary columns。核心是避免 Engineering=1、Business=2 這類假順序。

11.4 Split

Train = 學模型；Validation = 選模型 / hyperparameters；Test = 最後報告。Test 不是「第三個 training set」。

11.5 Leakage

只要 test information 影響任何 decision，最終 test score 就不再是真正 unseen performance。

11.6 10 秒口訣

Scale → Encode → Split → Fit Train Only → Transform All → Validate → Test Once

如果你在考試 / assignment 只記得一條流程，就記這條。

12. 延伸實作｜Scikit-learn Pipeline 思路（非原投影片程式碼）

影片提到本課會使用 Scikit-learn，而且很多正確 preprocessing 操作已由軟體支援。下面程式碼是為了把教材概念具體化，並非影片逐字提供的 code。

from sklearn.compose import ColumnTransformerfrom sklearn.pipeline import Pipelinefrom sklearn.preprocessing import StandardScaler, OneHotEncoderfrom sklearn.impute import SimpleImputerfrom sklearn.linear_model import LogisticRegressionnumeric_features = ["StudyHours", "GPA", "Attendance"]categorical_features = ["Major", "StudySpace"]numeric_pipe = Pipeline([    ("imputer", SimpleImputer(strategy="median")),    ("scaler", StandardScaler()),])categorical_pipe = Pipeline([    ("imputer", SimpleImputer(strategy="most_frequent")),    ("onehot", OneHotEncoder(handle_unknown="ignore")),])preprocess = ColumnTransformer([    ("num", numeric_pipe, numeric_features),    ("cat", categorical_pipe, categorical_features),])model = Pipeline([    ("preprocess", preprocess),    ("classifier", LogisticRegression()),])# 只對 training data 執行 fitmodel.fit(X_train, y_train)# validation / test 會自動用 training 時學到的 preprocessing 參數val_pred = model.predict(X_val)test_pred = model.predict(X_test)

這段 code 與教材每頁如何對應

StandardScaler → 第 4 頁 feature scaling。

OneHotEncoder → 第 5 頁 categorical encoding。

train / validation / test → 第 6 頁。

Pipeline + ColumnTransformer → 第 7 頁 consistent preprocessing。

只對 X_train fit → 第 8 頁防止 leakage。

最重要的軟體觀念

Pipeline 的價值不是「code 比較短」而已，而是把 preprocessing 和 model 綁成一個不可漏步的流程；配合 cross-validation 時，也較容易確保每一 fold 的 preprocessing 只 fit 在該 fold 的 training portion。

13. 最後總結｜你學完應該能回答的 12 條問題

1. 為什麼 Study Hours 0–40 與 Attendance 0–1 可能令 KNN 偏向 Study Hours？

答：因為 KNN 用 distance；未 scaling 時大範圍 feature 更容易主宰距離。

2. Z-score 做了什麼？

答：把數值改成距離 training mean 幾個 standard deviations。

3. Z-score 會否自動把任何資料變 normal？

答：不會；它只 center + scale。

4. Min-Max 的結果通常在哪裡？

答：training data 的 min/max 對應到 0/1。

5. 為何 category 不直接編成 1,2,3,4？

答：會製造不存在的 ordinal relationship。

6. One-hot 的每一欄代表什麼？

答：某個 category 是否成立，0 或 1。

7. Train / Validation / Test 的角色？

答：fit / tune / final evaluate。

8. Stratify 的目的？

答：保持 class distribution。

9. 為何先 split 再 preprocessing？

答：避免 test statistics 進入 preprocessing。

10. Test 可不可以 transform？

答：可以；但 transformation parameters 必須來自 training fit。

11. Data leakage 的結果？

答：成績虛高、deployment 失敗、結論無效。

12. Pipeline 最核心的價值？

答：確保 training-only fit、所有 splits / deployment 使用一致步驟。

一頁終極脈絡

原始資料的問題（尺度 / 類別 / 缺失） → preprocessing 把資料變成模型可用的 representation → split + pipeline 限制 preprocessing 只能從 training 學習 → validation 做選擇 → test 保持真正 unseen → 最終成績才可信。

資料來源註記

本文件以使用者提供的 University of Colorado Boulder「Data Pre-Processing」PDF（9 pages）、影片（約 10:52）及 TXT transcript 為分析基礎。文件中標示「延伸解析」的部分，是為了教學理解而補充的一般 machine-learning 知識；其餘核心主線均依教材內容整理。

## Connections

[[Supervised Learning MOC]] · [[Supervised Learning - Module 3 MOC]] · [[Cross-Validation for Hyperparameters]] · [[Domain-Specific Applications of Evaluation Metrics]]

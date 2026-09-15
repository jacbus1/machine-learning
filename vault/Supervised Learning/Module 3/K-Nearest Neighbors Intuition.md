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

# K-Nearest Neighbors Intuition

> [!info] Learning position
> Supervised Learning → Module 3 → Topic 7

## KNN_Intuition_影片_PDF_逐頁詳細分析

K-Nearest Neighbors (KNN)Intuition

VIDEO × PDF × TXT 交叉逐頁詳細分析

Classification Methods | University of Colorado Boulder

內容包括：10頁 PDF 逐頁解析、影片口述補充、圖表解讀、概念脈絡、KNN workflow、易錯位與考試重點。

閱讀方式  先看每頁「一句話核心」，再看「圖像 / 影片補充」與「深度拆解」。凡非投影片直接提供、而是為方便理解加入的數學或術語，均標示為「補充理解」。

0. 單元總覽

這一課的核心不是「背一條公式」，而是理解一個非常直觀的分類哲學：

一句話核心  KNN 不先學一條分類公式；它在需要預測時，直接找訓練資料中最相似的 k 個案例，再以鄰居的結果作決定。

任務

本課以 classification（分類）為主；影片也指出 KNN 可用於 regression，但本單元先不展開。

核心機制

Similarity → Distance → k nearest neighbors → Majority vote。

最重要超參數

k = 要參考多少個鄰居。

模型複雜度

k 小：邊界細碎、較易 overfit；k 大：邊界平滑、較易 underfit。

選 k 方法

用 cross-validation 找驗證表現的 sweet spot，而不是只看 training accuracy。

主要風險

高維資料的 distance concentration、prediction 計算成本、儲存全部訓練資料、feature scaling、irrelevant features、class imbalance。

0.1 影片與 PDF 的角色分工

PDF 提供每一頁的正式結構、例子與圖表；影片口述則解釋「為甚麼」及與 Logistic Regression / LDA 的差別。

第 7 頁與第 8 頁的 PDF 靜態版本只有章節標題；影片中可看到動畫展開後的完整內容，因此本筆記會把影片畫面補回。

影片全長約 9 分 57 秒；TXT 是影片逐字稿，本筆記以 TXT 對照影片畫面作語義分析。

0.2 整個 KNN 的思考鏈

→ ① 有一個新的學生 / 新資料點 x_new。

→ ② 定義「相似」：把 x_new 與所有訓練資料計算距離。

→ ③ 將距離由近至遠排序，取最接近的 k 個。

→ ④ Classification：看這 k 個鄰居哪一類佔多數（majority vote）。

→ ⑤ 調整 k：太小易追噪音，太大會把局部差異抹平。

→ ⑥ 用 cross-validation 選擇 k，並在預測前確保 features 的 scale 合理。

1. PDF 第 1 頁：K-Nearest Neighbors Intuition

PDF 第 1 頁：課程標題頁

來源對應：PDF p.1；影片開場。

一句話核心  本單元從「直覺」切入 KNN，重點放在 classification，而非先從複雜數學推導開始。

1.1 投影片在告訴你甚麼？

主題是 K-Nearest Neighbors（KNN）的直覺，屬於 Classification Methods。

影片開場指出：KNN 是最簡單、最直觀的分類方法之一；它也可以做 regression，但本課先以 classification 說明。

教學策略是先建立「相似案例」的直覺，再處理 k、decision boundary、bias-variance 與 dimensionality。

1.2 與前面模型的關係

影片特別拿 KNN 與 Logistic Regression、LDA 對比：

Logistic Regression：會學一組參數，形成機率 / decision boundary。

LDA：先建模不同類別下 features 的分布，再由概率決定分類邊界。

KNN：不先學上述形式的邊界或資料分布；預測時直接回到 training data 找最近案例。

最值得記  KNN 的「模型」很大程度上就是資料本身。你不是先把歷史資料濃縮成一條公式，而是保留歷史案例，等新案例出現再比相似度。

2. PDF 第 2 頁：Contents of This Video

PDF 第 2 頁：本課六個主題

來源對應：PDF p.2；影片約前 1 分鐘。

一句話核心  這一頁其實就是整課的 roadmap：方法 → 距離 → k → bias/variance → 高維問題 → 優缺點。

2.1 六個學習目標逐一解讀

The KNN classification approach: 先學 KNN 如何分類：找到 k 個最相似的訓練案例，再投票。

Finding similar students with distance measures: 「相似」不是主觀形容詞，而要透過距離衡量。

Effect of k on decision boundaries: k 改變後，分類邊界會由鋸齒狀變得更平滑。

Bias-variance tradeoff in KNN: k 同時控制模型複雜度；需要在 overfit 與 underfit 之間找平衡。

Curse of dimensionality: feature 變多後，距離越來越難提供「誰真的更近」的資訊。

Strengths and limitations for student prediction: 最後從實務角度評估 KNN 是否適合某個資料集。

2.2 最好如何記這一課？

記憶口訣  「找近鄰 → 看 k → 看邊界 → 做 CV → 防高維 → 要 scaling」。這六步已覆蓋本單元大部分考點。

3. PDF 第 3 頁：The KNN Approach

PDF 第 3 頁：k=5 的學生分類例子

來源對應：PDF p.3；影片用 22 study hours、85% attendance、8 assignments 的新學生示範。

一句話核心  「新學生像誰？」— 找到最近的 5 個歷史學生，4 個 pass、1 個 fail，所以預測 pass。

3.1 例子逐步拆解

→ 新學生的 features：22 小時 study hours、85% attendance、8 個 assignments completed。

→ 設定 k = 5，代表只參考距離最近的五名歷史學生。

→ 圖中以黃色圓圈標出 5 nearest neighbors；其中多數是 Passed。

→ Classification 的決策：majority vote（多數決）。若 5 人中 4 pass、1 fail，新學生預測為 pass。

3.2 「No Training Required」真正意思

課件強調 KNN 不需要像 Logistic Regression 一樣先進行參數估計，也不需要先擬合一個特定形狀的 decision boundary。

但「沒有 training」不等於「沒有計算成本」：成本被推遲到 prediction time。每有一個新資料點，就要跟大量 training points 計算距離。

因此 KNN 的直覺是：training 很輕；prediction 可以很重。

3.3 補充理解：distance 可以怎樣寫？

補充公式（非本頁投影片直接列出）  常見 Euclidean distance：d(x,z)=√Σ_j(x_j−z_j)²。意思是：每個 feature 的差異先平方、加總，再開平方。KNN 需要的本質不是這一條特定公式，而是一個能比較「近 / 遠」的 distance measure。

3.4 這張圖最容易忽略的一點

圖上只畫出 Study Hours 與 Attendance 兩個維度，讓人可以視覺化距離；但例子文字其實還有 assignments completed。真實 KNN 可以在更多 features 上計算距離，只是無法直接畫成人眼熟悉的 2D 圖。

4. PDF 第 4 頁：Effect of k on Predictions

PDF 第 4 頁：k = 1、5、15、50 時的 decision regions

來源對應：PDF p.4；影片用四張 decision-boundary 圖說明 k 對模型複雜度的影響。

一句話核心  k 越小，模型越「貼資料」；k 越大，模型越「看大局」。

4.1 四個 k 值代表甚麼？

k = 1

每次只聽最近一個鄰居。邊界非常鋸齒、出現很多小島，對單一 observation / noise 極敏感。

k = 5

局部多數投票開始消除孤立雜訊，小區域仍可保留，邊界變得較穩定。

k = 15

更強的平滑效果；主要群集仍被抓住，但細小局部結構被平均掉。

k = 50

非常平滑，只剩最明顯的大區塊；局部訊號容易被多數鄰居淹沒。

4.2 Decision boundary 為何會變？

在 k=1 時，只要最近的一個點換了 class，預測就可以立即翻轉，所以空間中會形成很多不規則的小區塊。

k 增大後，需要更多鄰居共同改變 majority vote 才能翻轉預測，因此 prediction surface 變得平滑。

因此 k 其實是 KNN 的 complexity knob（複雜度旋鈕）。

4.3 逐字稿中一個需要留意的口誤 / 內部矛盾

來源核對  影片中曾短暫說「as we increase the number of neighbors, in a sense we’re increasing the complexity」，但緊接著又明確說 k 增加會令模型「smoother, less complex」，而第 4、5 頁圖像也一致支持後者。因此讀課件時應理解為：k ↑ → complexity ↓。

4.4 與 overfitting 的連結

k=1 幾乎可以把每個 training point 的個別差異都記住，training fit 很高，但對新資料未必穩定。

較大的 k 會平均化局部變動，通常能降低 variance，但若太大會犧牲真正的局部結構。

5. PDF 第 5 頁：Choosing the Right k

PDF 第 5 頁：Training Accuracy、Cross-Validation Accuracy 與 optimal k

來源對應：PDF p.5；影片強調用 cross-validation 找 sweet spot，本圖例約為 k=5。

一句話核心  不要選「training accuracy 最高」的 k；要選「cross-validation 對新資料表現最好」的 k。

5.1 圖表由左至右怎樣讀？

最左側 k 很小：Training Accuracy 最高，k=1 甚至可達 1.00；但這不是自動代表最好，因為可能把 training noise 也記住。

中間約 k=5：Cross-Validation Accuracy 達到高點，圖中以黃色虛線標示 optimal k = 5。

右側 k 很大：Training 與 CV accuracy 逐漸下降；模型太平滑，很多局部差異被忽略，形成 underfitting。

5.2 Bias-Variance Tradeoff

k 小

低 bias / 高 variance；模型非常 flexible，容易受 individual points 影響。

k 適中

在局部靈活性與穩定性之間取得平衡；通常靠 cross-validation 選出。

k 大

高 bias / 低 variance；模型變 rigid / smooth，可能 underfit。

5.3 為甚麼 training accuracy 會誤導？

如果 k=1，某個 training point 預測自己時，最近的點往往就是自己，因此 training accuracy 很容易非常高。

Cross-validation 的價值，是把部分資料暫時當作「未見過的新資料」，更接近我們真正關心的 generalization。

考試級核心  k 是 hyperparameter。典型流程：候選 k → cross-validation → 選 CV 表現最佳 / 穩定的 k → 再評估 test set。

6. PDF 第 6 頁：Curse of Dimensionality

PDF 第 6 頁：feature 數量增加後，距離的辨識能力下降

來源對應：PDF p.6；影片討論高維空間中 distances 失去辨識力，以及 measurement noise 的影響。

一句話核心  KNN 靠「誰比較近」做決定；如果所有點的距離都變得差不多，nearest neighbor 就不再那麼有意義。

6.1 投影片列出的 features

Study hours、attendance、assignments、GPA、sleep、job、major、library time、tutoring、forum participation、study space、study time preference、practice exams…

這個列表的目的不是要你背，而是提醒：我們很容易覺得「多加 feature 一定更好」，但 KNN 對高維度特別敏感。

6.2 圖表真正想說甚麼？

圖中 Average Distance 與 Minimum Distance 都隨 feature 數增加而變化；重點是「最近」與「一般」距離的可分辨性下降。

當距離不再清楚區分誰近誰遠，KNN 的核心機制——nearest neighbors——便受到破壞。

6.3 PDF 與逐字稿的表述差異

來源核對  PDF 寫「all students become equally far from each other」；逐字稿後段則口述成資料點「become really, really close together」。兩句字面方向不同，但它們共同指向的實務結論是一樣：高維下距離會 concentration，近與遠的差別變得不夠有辨識力。

6.4 為甚麼小量 measurement error 會更麻煩？

影片舉例：若高維資料中某一個 feature（例如工作時數）測量有少量誤差，當候選鄰居本來就距離很接近時，這點誤差可能足以改變鄰居排名。

鄰居名單一變，majority vote 就可能變；因此 noise 可以被放大成 classification mistake。

實務含義  KNN 並不因為「feature 多」而自動更聰明。Feature selection / dimensionality reduction（補充術語）往往是高維 KNN 的重要配套。

7. PDF 第 7 頁：Strengths of KNN

PDF 第 7 頁：靜態 PDF 只保留「Strengths of KNN」標題

來源對應：PDF p.7；本頁完整要點需要由影片動畫 / TXT 補回。

一句話核心  KNN 最大優勢是 flexible：不強迫資料符合某個預先指定的線性 / 分布形狀，而是讓 training examples 本身定義局部模式。

7.1 影片畫面補回的完整 Strengths

影片約 8:10 左右的完整 Strengths of KNN 畫面（PDF 靜態頁未包含動畫後內容）

Intuitive / similarity-based：邏輯容易解釋——找跟你最像的人，看他們發生了甚麼。

No distribution assumptions：不用先假設資料一定服從某個特定 distribution。

Handles complex, non-linear boundaries naturally：邊界可以是彎曲、不規則、局部化的，不要求是一條直線。

No conventional training time：只需保存資料；主要計算發生在 prediction time。

Local adaptation：不同空間區域可由不同鄰居決定，因此可自然捕捉 local patterns。

影片畫面亦指出可產生 probability estimates（例如由鄰居中各 class 比例形成直觀概率）。

7.2 Student Success Applications

Finding similar student cohorts for targeted interventions：找出與某學生高度相似的歷史群體，做更針對性的支援。

Personalized recommendation systems：按相似學習者行為作個人化建議。

Understanding local patterns in academic performance：不是只看全局平均規律，而是看某一小群相似學生的局部規律。

7.3 「不作假設」不是「沒有任何選擇」

KNN 雖然不需要指定線性方程或 class distribution，但仍要選 distance measure、k、features、scaling 方法。這些選擇同樣會影響結果。

8. PDF 第 8 頁：Limitations of KNN（章節過場）

PDF 第 8 頁：靜態 PDF 只保留「Limitations of KNN」標題

來源對應：PDF p.8；詳細 limitation 內容在影片動畫與 PDF p.9 展開。

一句話核心  本頁本身是 section divider；真正需要掌握的是下一頁的計算成本、儲存、irrelevant features、高維、imbalance 與 scaling。

8.1 為甚麼 PDF 會看似「空白」？

這份 PDF 很可能保留了簡報 build / animation 的中間狀態：先出現章節標題，再在下一頁 / 下一 build 顯示完整內容。

所以不能把第 8 頁理解成「沒有內容」；它的作用是把教學從優勢切換到限制。

8.2 影片轉場後可看到的 limitation 畫面

影片約 8:30 左右：Limitations 完整內容（與 PDF 第 9 頁一致）

這一轉場也反映本課的整體平衡：KNN 雖然直觀 flexible，但代價是 prediction-time computation 及對資料表示方式非常敏感。

9. PDF 第 9 頁：Key Disadvantages + Feature Scaling

PDF 第 9 頁：KNN 的主要限制，以及 scaling 前後的視覺差異

來源對應：PDF p.9；影片特別用 Study Hours 與 GPA 說明不同量綱會扭曲 distance。

一句話核心  KNN 的弱點幾乎都跟一件事有關：它高度依賴「距離」。資料大、feature 不好、尺度不一致，都會直接破壞距離的品質或計算效率。

9.1 六個限制逐一拆解

Computational cost

大資料集很慢。每次來一個新資料點，最直接做法要對大量 training observations 計算距離，再找最近 k 個。

Storage requirements

要保留 training data；不像某些 parametric model 可只保留一組較小參數。

Sensitive to irrelevant features

如果某 feature 與目標無關，它仍會進入 distance，令「相似」的定義混入噪音。

Curse of dimensionality

feature 太多時，距離的相對差異變弱，nearest neighbor 的辨識力下降。

Imbalanced data

如果一個 class 數量遠多於另一個 class，鄰居多數決也容易偏向 majority class。

Feature scaling critical

Study Hours、GPA、Attendance 的數值範圍不同；不 scaling 時，大量綱 feature 可能主導距離。

9.2 Before Scaling vs After Scaling 圖解

Before Scaling：Study Hours 約 10–40；GPA 約 2–4。只看數值差，study hours 的差距可比 GPA 大很多。

如果使用以數值差為核心的 distance，Study Hours 可能對總距離貢獻過大；GPA 即使很重要，也可能被壓低。

After Scaling：兩個軸都被映射到近似 0–1 範圍，distance 才比較像是在「同一把尺」上比較。

9.3 補充理解：常見 scaling 方式

補充（非本頁指定唯一做法）  Min-Max scaling 常把 feature 映射到 0–1；Standardization 常把 feature 轉成平均 0、標準差 1。課件要求掌握的是「KNN 對 feature scale 敏感」，而不是本頁指定某一種 scaling 必須使用。

9.4 一個直觀數值例子

假設學生 A 與新學生 Study Hours 差 10 小時、GPA 差 0.2；若直接算數值距離，10 的影響遠大於 0.2。

這不一定代表 Study Hours 在真實問題中比 GPA 重要，只代表它的「單位 / range」較大。因此 scaling 是 KNN workflow 的關鍵 preprocessing。

10. PDF 第 10 頁：What We’ve Covered

PDF 第 10 頁：全課總結

來源對應：PDF p.10；影片結尾亦給出實務使用建議。

一句話核心  KNN = similarity-based classification；要同時管理 distance、k、model complexity、dimensionality 與 scaling。

10.1 六點總結重新串成一條線

→ 先以 distance 找 nearest neighbors。

→ 用 k 決定參考多少個 neighbors。

→ k 控制 decision boundary 的平滑程度 / model complexity。

→ 透過 bias-variance tradeoff 理解為何 k 太小或太大都不好。

→ feature 變多會造成 dimensionality challenge，削弱 distance 的辨識力。

→ 實務使用要權衡 flexibility 與 computational / storage / scaling / imbalance 問題。

10.2 影片最後的使用建議

講者建議：當你對 underlying training data 的形式不太了解、又不想作很強的 shape / distribution assumptions 時，KNN 是值得探索的方法。

同時資料集不宜過大，否則 prediction cost 會成為問題；影片亦提醒資料量太少時，本來就難找到有代表性的近鄰。

最終判斷  KNN 的價值不是「永遠最好」，而是提供一個非常直接的 non-parametric baseline：先問相似案例，再看這種局部規則能否 generalize。

11. 全單元脈絡：從一個新學生到最後預測

完整 workflow  Raw features → Scaling / feature choice → Distance to training samples → Sort neighbors → Pick k → Majority vote → Validate k with CV → Evaluate limitations

11.1 Step-by-step 實際 ML workflow

Step 1 — 準備 features

例如 study hours、attendance、assignments、GPA。先確認哪些 feature 真正有意義。

Step 2 — Scaling

因為 KNN 用 distance，比較前要避免 0–40 的 feature 壓過 0–1 的 feature。

Step 3 — 定義 distance

決定如何衡量兩個 observations 的相似度。

Step 4 — 選候選 k

例如 1、3、5、7、…；不要只靠直覺定死。

Step 5 — Cross-validation

比較候選 k 在未見資料上的表現，找 sweet spot。

Step 6 — Prediction

對新資料算距離，取 k nearest neighbors，classification 用 majority vote。

Step 7 — Diagnostics

檢查 dataset size、dimensionality、irrelevant features、class imbalance 與 prediction latency。

11.2 k 對模型的方向表

k

Boundary

Bias

Variance

典型風險

小

鋸齒 / 局部

低

高

Overfitting

中

適度平滑

平衡

平衡

通常由 CV 尋找

大

非常平滑

高

低

Underfitting

12. 最容易混淆 / 最值得考前再看

「KNN 沒有 training」

不是沒有成本，而是沒有傳統參數擬合；成本主要在 prediction-time distance computation。

k 大是否更複雜？

不是。依本課圖像與後續口述：k 大 → smoother → less complex → bias ↑、variance ↓。

k=1 training accuracy 高是否最好？

不一定，可能 overfit；要看 cross-validation / test generalization。

高維是不是點真的全部靠在一起？

課件語句有不同說法；實務應抓住 distance concentration：近 / 遠的相對差異失去辨識力。

feature 越多越好？

KNN 不一定；irrelevant features 與 dimensionality 都可能讓距離變差。

Scaling 為甚麼特別重要？

因為 KNN 的決策直接依賴 distance；range 大的 feature 可不合理地支配距離。

KNN 是否只能分類？

不是。影片開場說也可做 regression，但本單元只教 classification 直覺。

12.1 30 秒口述版

KNN 是一種以相似度為核心的分類方法。對一個新 observation，我們計算它跟 training data 的距離，找最近的 k 個鄰居，以 majority vote 決定 class。k 小時模型很 flexible、variance 高、容易 overfit；k 大時 decision boundary 更平滑、bias 高、可能 underfit，所以用 cross-validation 選 k。KNN 不需要先擬合參數，但預測很耗計算，而且必須注意 feature scaling、irrelevant features、class imbalance 與 curse of dimensionality。

13. 本單元速查表

KNN 全名

K-Nearest Neighbors

核心問題

Who are the most similar training examples, and what happened to them?

分類決策

Majority vote

k 的作用

控制要參考的鄰居數量，也間接控制模型複雜度

k 小

Complex / jagged / low bias / high variance / overfit risk

k 大

Smooth / rigid / high bias / low variance / underfit risk

如何選 k

Cross-validation

高維問題

Distance becomes less discriminative / curse of dimensionality

必做 preprocessing

Feature scaling（課件重點）

主要優勢

Intuitive、flexible、non-linear/local patterns、few distribution assumptions

主要限制

Prediction cost、storage、irrelevant features、high dimensionality、imbalance、scaling

最後只記一句  KNN =「找最像你的 k 個人，看看大多數人結果如何」；真正的難點不是投票，而是如何定義相似、如何選 k，以及高維 / scaling 會不會讓距離失真。

## Connections

[[Supervised Learning MOC]] · [[Supervised Learning - Module 3 MOC]] · [[Evaluation Metrics_ROC Curves, AUC]] · [[L2 Regularization in Logistic Regression]]

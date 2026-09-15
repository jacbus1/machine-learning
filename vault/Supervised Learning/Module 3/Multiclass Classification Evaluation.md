---
course: Supervised Learning
module: 3
status: curated
tags:
  - supervised
  - module-3
  - classification
  - evaluation
publish: true
---

# Multiclass Classification Evaluation

> [!info] Learning position
> Supervised Learning → Module 3 → Topic 11

## Multiclass_Classification_Evaluation_Detailed_Analysis_Updated

Multiclass ClassificationEvaluation

多類別分類評估：Video + TXT 交叉分析／PDF 每頁詳細解讀

Classification Methods — University of Colorado BoulderDaniel E. Acuna

文件用途：把 9 頁 PDF 的視覺內容、影片中的口頭解釋，以及 TXT 講稿整合成一份可複習的詳細筆記。特別標示 PDF 與影片不一致／動畫缺失之處，避免只看靜態 PDF 而漏掉重點。

使用的來源

Multiclass Classification Evaluation .pdf（9頁）

240P Multiclass Classification Evaluation .mp4（約 7分22秒）

Multiclass Classification Evaluation .txt（影片逐字稿）

來源界線：以下「課件／講者內容」均以已上傳 PDF、影片與 TXT 為基礎；若加入為了理解而設計的數字例子，會明確標成「教學延伸（非原課件數據）」。

0. 單元全貌：這一章到底在解決什麼？

二元分類只有兩類，因此可以很自然地把其中一類當作 positive、另一類當作 negative，然後直接計算 precision、recall。多類別分類（3 類以上）最大的麻煩是：沒有唯一、固定的「positive class」。講者的核心做法是：每次挑一個類別當正類，其餘全部合併成負類，也就是 One-vs-All（OvA），先得到每一類自己的 precision / recall，再用 Macro 或 Micro 把多個類別的表現整合成一個整體指標。最後，ROC 也能以相同 OvA 思路對每一類分別畫出。

核心流程

多類別Confusion Matrix

→

One-vs-All逐類評估

→

Macro / Micro平均

ROC：每類 OvA

你應該帶走的 5 個問題

• 多類別 confusion matrix 的對角線（diagonal）代表什麼？

• 當有 A/B/C/… 多個類別時，TP、FP、FN 要怎樣重新定義？

• Macro averaging 為何「每個 class 一票」？

• Micro averaging 為何更接近「每個 sample 一票」？

• 評估方法應該怎樣配合 business objective 與 class importance？

一句話記憶

記憶口訣：先看 confusion matrix 找「錯在哪一類」 → 再 One-vs-All 算「每一類有多準／漏多少」 → 再決定 Macro（重視類別公平）或 Micro（重視整體樣本表現） → 需要看 threshold 行為時，再看每一類 ROC。

PDF 第 1 頁 — Multiclass Classification Evaluation

圖：原 PDF 第 1 頁

PDF重點

Video/TXT補充

分析／意義

標題頁。指出主題是多類別分類評估，屬於 Classification Methods 單元。

影片開場直接把問題設定為：之前的例子都是 binary classification；當 class 超過兩個時，precision 與 recall 應怎樣計算？

這頁本身沒有公式，但建立了本章的「轉換任務」：把 binary evaluation toolkit 延伸到 multiclass。

詳細分析

講者不是要重新發明新的 precision / recall，而是要處理「原本二元指標所依賴的 positive / negative 定義，在多類別下不再唯一」這個結構性問題。因此，後面所有方法都可以理解為：先把 multiclass 問題拆成多個可套用 binary metric 的視角，再聚合。

Binary：只有兩類，positive / negative 的角色清楚。

Multiclass：三類或以上，任何一個 class 都可以成為「這一次評估的 positive」。

因此本單元的主軸不是換模型，而是換「評估視角」。

學習定位：這一章關心的是「model evaluation」，不是訓練 Random Forest、Logistic Regression 等模型本身。模型可以不同，但評估框架仍可套用。

PDF 第 2 頁 — Contents of This Video

圖：原 PDF 第 2 頁

PDF重點

Video/TXT補充

分析／意義

列出四個主題：multiclass confusion matrices、one-vs-all metric calculation、macro vs micro averaging、choosing the right approach。

講者說會把 familiar metrics（precision、recall）適配到超過兩類的情境，並研究如何把多個 class metrics 合成一個數字。

四個主題其實是一條完整 evaluation pipeline：看錯誤結構 → 逐類計算 → 整體彙總 → 按業務目標選方法。

為什麼這個順序很重要？

• 先看 confusion matrix：不要一開始只盯著單一 accuracy，先看模型究竟把哪些類別互相搞混。

• 再用 One-vs-All：把某一 class 單獨抽出，重新建立 TP / FP / FN。

• 再選 Macro / Micro：決定「每個 class 同樣重要」還是「每個 sample 同樣重要」。

• 最後按應用選方法：不同錯誤成本、class imbalance、business priority 會令最佳指標不同。

本頁的考試／實作訊號

如果題目問「每個 class 都同等重要」，要想到 Macro。

如果題目強調自然類別不平衡、整體樣本層面的表現，要想到 Micro。

如果題目問「某個特定 class 的 precision / recall」，先 One-vs-All。

PDF 第 3 頁 — From Binary to Multiclass

圖：原 PDF 第 3 頁

PDF重點

Video/TXT補充

分析／意義

左側比較 binary 與 multiclass；右側用 2×2 binary confusion matrix 和 A/B/C multiclass matrix 對比。頁面明確提出三個挑戰：positive 是誰、class imbalance、multiple confusion patterns。解法：One-vs-all。

講者用 A/B/C 解釋：評 A 時把 A 當 positive、B+C 當 negative；評 B 時把 B 當 positive、A+C 當 negative；依此類推。

Multiclass 的「positive」不是消失，而是變成「針對某一 class 暫時定義」。這讓原本的 binary precision / recall 可以被重用。

1) Binary confusion matrix 的基礎

頁面右上角的 binary confusion matrix 包含 TN、FP、FN、TP。其核心前提是：你已經知道哪一類叫 Yes（positive）、哪一類叫 No（negative）。因此 precision / recall 可以直接以 TP、FP、FN 計算。

2) Multiclass matrix 要看「對角線」

右下角 A/B/C 表格把理想情況畫成：A→A、B→B、C→C 的 diagonal 都是 High，而 off-diagonal 都是 Low。這表示正確分類應集中在對角線；非對角線則代表某類被誤判成另一類。

3) One-vs-All 的三次視角

正在評估

Positive

Negative（合併）

Class A

A

B + C

Class B

B

A + C

Class C

C

A + B

理解提醒：本課件這裡的 One-vs-All 是「用來計算評估指標的拆分方式」。不要自動把它等同於模型訓練時一定採用 One-vs-Rest classifier；本單元只是在談 evaluation。

PDF 第 4 頁 — Multiclass Confusion Matrix — Business Sector Example

圖：原 PDF 第 4 頁

PDF重點

Video/TXT補充

分析／意義

任務：把公司分類到 Healthcare、Finance、Technology、Retail。Features 是 financial / operational metrics；模型是 Random Forest。Business insight：strong diagonal；Finance vs Healthcare confusion；加 sector-specific features。

講者重申最先要看的，是 confusion matrix 是否有 strong diagonal；也可以針對特定 rows / confusion patterns 看 Finance 與 Healthcare 是否容易互相誤判。

Confusion matrix 不只是算分數，而是診斷「哪一對類別難分」。錯誤模式可以反過來指導 feature engineering。

情境拆解

Task: 每間公司只能（在此例中）被歸到四個 sector 之一。

Features: 金融與營運指標提供模型區分 sector 的證據。

Model: Random Forest 只是示例；本頁重點是如何解讀模型輸出，而不是 Random Forest 原理。

Question: 模型是否真的能把四個 sector 分開？

Strong diagonal 的真正意思

當大部分 observation 落在正確 class 的 diagonal cell，代表模型把各 sector 的特徵區分得較清楚。相反，如果某兩個 sector 的 off-diagonal cells 特別大，就代表它們存在系統性混淆。

Finance vs Healthcare：如何從錯誤變成業務洞察

投影片給出的解讀是：Finance 與 Healthcare 都屬 heavily regulated sectors，所以某些金融／營運指標可能讓它們看起來相似。這時不是只說「模型不夠準」，而是採取 Action：增加 sector-specific features，讓模型拿到更能區分兩者的訊號。

重要限制：原 PDF 這頁沒有清楚顯示一個帶數字的完整 confusion matrix，因此不能從課件推算任何實際 accuracy、precision 或每個 sector 的樣本數。並且圖中沒有明示 row=actual 還是 row=predicted；做真實分析時必須先確認座標定義。

PDF 第 5 頁 — One-vs-All Approach

圖：原 PDF 第 5 頁

PDF重點

Video/TXT補充

分析／意義

核心概念：每個 class 都當成「Class vs All Others」的 binary classification。Healthcare 例子定義 TP、FP、FN，並給出 Precision、Recall 公式。

講者說：這樣得到的是「Healthcare 的 precision」和「Healthcare 的 recall」；其他 class 也各自重複一次。

多類別評估的關鍵不是直接在整個矩陣上硬套一組 TP/FP/FN，而是對每個 class 各建一個 binary 視角。

Healthcare 作為 positive class

項目

定義（課件）

直覺

TP

Healthcare companies correctly identified

真的是 Healthcare，而且模型也說 Healthcare。

FP

Other sectors mislabeled as Healthcare

不是 Healthcare，卻被模型誤叫 Healthcare。

FN

Healthcare companies missed

真的是 Healthcare，卻被模型分到其他 sector。

Precision：模型說「Healthcare」時有多可信？

Precision = TP / (TP + FP)

課件稱為 reliability of Healthcare predictions

Precision 的分母是「模型所有預測成 Healthcare 的公司」。其中真正 Healthcare 的比例越高，precision 越高。因此 FP 會直接拉低 precision。

Recall：真正 Healthcare 有多少被找出來？

Recall = TP / (TP + FN)

課件稱為 coverage of Healthcare companies

Recall 的分母是「實際所有 Healthcare 公司」。如果很多 Healthcare 被漏掉（FN 高），recall 便下降。

為什麼這頁沒有用 TN？

課件的 precision / recall 公式只需要 TP、FP、FN，所以沒有把 TN 放進公式。對某個單一 class 來說，其他所有 class 正確地被判成「不是 Healthcare」會形成大量 TN，但這些 TN 不直接改變 precision / recall。

記憶方法：Precision = 「我叫它 Healthcare，叫得準不準？」；Recall = 「真正 Healthcare，我找齊了多少？」

PDF 第 6 頁 — Averaging Strategies — Macro vs Micro

圖：原 PDF 第 6 頁

PDF重點

Video/TXT補充

分析／意義

Macro：equal weight to each class；Micro：equal weight to each sample。並給出 Macro Precision 與 Micro Precision 公式。使用例：Macro—rare disease detection；Micro—natural class imbalances / document classification。

講者補充：如果某 sector（如 Healthcare）樣本很多，Micro 的整體計數會自然讓大類別影響更大；Macro 則先算每類 precision 再平均。

這一頁是在回答：當每個 class 都有自己的 precision / recall 後，怎樣濃縮成一個 overall number。

Macro：先「每類算分」，再「類別平均」

Macro Precision = (1/K) × Σ Precision_i

K = class 的數量；每一個 class 都是一票

假設有四個 sector，Macro Precision 先得到四個 per-class precision，再把四個數字平均。無論某 class 有 10 個樣本還是 10,000 個樣本，它在最後平均中都佔 1/4。

Micro：先「把所有 class 的 TP/FP 合併」，再算一次

Micro Precision = Σ TP_i / Σ (TP_i + FP_i)

每個 sample 對總計數的貢獻更直接

Micro 不是先平均 class scores，而是把各 class 的 TP、FP 累積成一組 global counts。因此大 class 因為樣本多，會自然對結果產生更大影響。這就是投影片所說「equal weight to each sample」的意思。

Macro vs Micro：概念對照

面向

Macro

Micro

基本單位

Class

Sample / global counts

小眾 class

不會因樣本少而失去權重

可能被大 class 的大量樣本稀釋

課件例子

Rare disease detection

Document classification

核心問題

每類是否都做好？

整體所有樣本做得如何？

常見誤解：「有 class imbalance 就一定用 Micro」不是這頁真正想表達的唯一規則。講者同時強調：即使類別不平衡，如果每個 class 都重要（例如罕見疾病、重大 defect），仍可能更重視 Macro。應用目標比單純的 class frequency 更重要。

PDF 第 7 頁 — Macro vs Micro: When Each Matters

圖：原 PDF 第 7 頁

PDF 與影片差異：這一頁的靜態 PDF 只保留標題，內容區是空白；但影片播放到此頁時出現了完整的動畫／逐步顯示內容。因此只讀 PDF 會漏掉本頁最重要的例子。

圖：影片中的第 7 頁畫面（PDF 靜態版未保留這些動畫文字）

影片實際顯示的 Macro Averaging Examples

Medical Diagnosis：

Each disease equally critical to catch（每一種疾病都同樣重要）。

Rare diseases shouldn't be ignored（罕見疾病不能因樣本少而被忽略）。

Macro F1 preferred over Micro F1（此例偏好 Macro F1）。

Quality Control：

Each defect type matters for safety（每一種 defect 類型都可能涉及安全）。

Don't let common defects dominate（不要讓常見 defect 壟斷整體分數）。

影片實際顯示的 Micro Averaging Examples

Document Classification：

Many categories, some naturally rare（很多文件類別，其中一些自然較少）。

Overall accuracy across all documents（關心所有文件的整體表現）。

Micro F1 preferred over Macro F1（此例偏好 Micro F1）。

Image Recognition：

Many object classes, natural frequency differences（物件類別很多，而且出現頻率天然不同）。

Population-level performance matters（整體 population-level performance 更重要）。

這頁最關鍵的決策邏輯

Macro 與 Micro 不是「哪個比較高就選哪個」，而是在回答兩個不同問題。Macro 的倫理／業務含義是：不因 class 少就忽略它；Micro 的統計／營運含義是：讓每一個實際樣本按其自然出現頻率參與整體表現。

一句話分辨：Macro = class fairness / rare class visibility；Micro = population-level / sample-weighted performance。

PDF 第 8 頁 — Multiclass ROC Curves

圖：原 PDF 第 8 頁

PDF重點

Video/TXT補充

分析／意義

圖中以 One-vs-All 畫四條 ROC：Healthcare（藍）、Finance（橙）、Technology（綠）、Retail（紅）；x 軸 False Positive Rate，y 軸 True Positive Rate。

講者說可以把前面學過的 ROC 概念延伸到 multiclass：對每一 class 分別在所有可能 thresholds 上評估，然後各畫一條 ROC。

ROC 的 multiclass 化仍然依賴 OvA：每次把目標 class 當 positive，其餘 class 合併為 negative，觀察 threshold 改變時 TPR/FPR 的 trade-off。

圖應該怎樣讀？

每一條線不是四個模型，而可以理解為「同一 multiclass model 對不同 class 的 OvA threshold behavior」。

曲線越偏向左上角，一般表示在較低 FPR 下可取得較高 TPR；本圖視覺上 Technology（綠線）在不少低 FPR 區段高於其他線。

Healthcare、Finance、Retail 也各有自己的 ROC，表示不同 class 的可分辨性可能不同。

這張圖沒有告訴你的事

投影片沒有列出各 class 的數字 AUC，也沒有提供某一個具體 decision threshold，因此不能從本課件聲稱「Technology AUC = 某個數字」或指定最佳 threshold。它提供的是曲線形狀與「每類分開看」的分析框架。

為什麼 ROC 與前面 Precision / Recall 不衝突？

Precision / Recall 往往是在某一組 predictions（某個 threshold 或決策規則）下計算；ROC 則把 threshold 掃過多個位置，觀察 TPR 與 FPR 如何一起變化。因此 ROC 回答的是「跨 thresholds 的可分辨性」，而 per-class precision / recall 回答的是「在目前決策下表現如何」。

課件主旨：Multiclass ROC = 對每一 class 重複 One-vs-All，分別畫出 threshold curve。

PDF 第 9 頁 — What We Covered Today

圖：原 PDF 第 9 頁

PDF重點

Video/TXT補充

分析／意義

總結四點：multiclass confusion matrices + business interpretation；OvA 計算每類 precision/recall；Macro vs Micro 及使用情境；選擇評估框架。Key Takeaway：evaluation method 要對齊 business objectives 與 class importance。

影片結尾同樣強調：已把 binary evaluation toolkit 延伸到 multiclass，能讀 multiclass confusion matrix、用 OvA 算 metric、依 specific business needs 選 Macro/Micro。

本章不是要找「唯一正確指標」，而是建立一個能按 class importance 與業務後果選擇指標的框架。

整章濃縮成決策框架

A. 先問錯誤在哪裡：看 multiclass confusion matrix，找 diagonal 是否強、哪些 off-diagonal pair 特別明顯。

B. 再問某一類做得怎樣：把該類當 positive、其餘當 negative，用 OvA 算 precision / recall。

C. 再問整體要怎樣彙總：每個 class 同等重要 → Macro；希望依自然樣本頻率反映 overall performance → Micro。

D. 若要研究 threshold：對每個 class 畫 OvA ROC curve。

E. 最後回到 business objective：哪種錯誤更嚴重？rare class 是否必須被看見？整體 population performance 是否最重要？

Key Takeaway：Choose evaluation methods that align with your business objectives and class importance.（選指標不是純數學操作，而是把指標和實際目標、類別重要性對齊。）

10. 教學延伸：用一個數字例子把 OvA、Macro、Micro 串起來

來源說明：以下數字例子是為了幫助理解而自行設計，並非原 PDF／影片中的數據。

假設有 3 類，Actual 為列、Predicted 為欄

Pred A

Pred B

Pred C

Actual A

40

5

5

Actual B

4

30

6

Actual C

1

4

25

Class A 的 One-vs-All

TP_A = 40（A → A）

FP_A = 4 + 1 = 5（B/C 被誤判為 A）

FN_A = 5 + 5 = 10（A 被誤判為 B/C）

Precision_A = 40 / (40 + 5) = 0.889

Recall_A = 40 / (40 + 10) = 0.800

三類都算完後（示例）

Class

Precision

Recall

F1

A

0.889

0.800

0.842

B

0.769

0.750

0.759

C

0.694

0.833

0.758

Macro Precision 約為 (0.889 + 0.769 + 0.694) / 3 = 0.784。它不理會 A/B/C 各有多少樣本，三類同權。

在這個 single-label multiclass 示範中，總正確數 = 40 + 30 + 25 = 95，總樣本 = 120，所以整體 accuracy = 95/120 = 0.792；Micro aggregation 會非常接近這種「所有樣本一起算」的 population-level 視角。

你應該觀察到：Class C 的 precision 最低（誤報較多），但 recall 反而最高；如果只看一個 overall score，這些 class-specific weakness 很容易被藏起來。這就是為什麼 confusion matrix + per-class metrics 仍然必要。

11. 最終複習表（Cheat Sheet）

你想回答的問題

首選工具

看什麼

課件例子／提示

哪些類別互相搞混？

Multiclass confusion matrix

Diagonal vs off-diagonal

Finance vs Healthcare confusion

模型說某 class 時有多可靠？

Per-class Precision (OvA)

TP / (TP + FP)

Healthcare prediction reliability

真正某 class 有多少找得到？

Per-class Recall (OvA)

TP / (TP + FN)

Healthcare coverage

每個 class 都同等重要？

Macro averaging

先每類算，再平均

Rare disease / quality control

整體樣本表現更重要？

Micro averaging

先合併 global counts

Document classification / image recognition

不同 threshold 下如何？

Per-class ROC (OvA)

TPR vs FPR curve

Healthcare / Finance / Technology / Retail ROC

最重要的 6 句

Multiclass 的 positive class 是「針對某一類暫時定義」，不是全局唯一。

One-vs-All 讓 binary 的 TP / FP / FN 與 precision / recall 可以在 multiclass 中重用。

Confusion matrix 看 error pattern；不要只看單一 overall metric。

Macro = 每個 class 同權，能讓 rare classes 保持可見。

Micro = 每個 sample / global count 更直接地決定總分，反映自然頻率。

最後選什麼 metric，要看 business objective 與 class importance。

來源檔案

Multiclass Classification Evaluation .pdf

240P Multiclass Classification Evaluation .mp4

Multiclass Classification Evaluation .txt

附錄 A — 最新補充：整個 Topic 的精簡主線

這一節把前面的逐頁分析，再濃縮成「考試／實作時最容易直接使用」的版本。內容以課件與影片為主；凡屬額外概念補充，會明確標示。

一條主線記完整章

Multiclass（3 類以上）沒有唯一 positive class → 先看 multiclass confusion matrix → 用 One-vs-All 把每個 class 輪流當 positive → 為每類計 Precision / Recall → 用 Macro 或 Micro 彙總 → 如需研究不同 threshold，再看每個 class 的 OvA ROC。

A1. 整個 Topic 的 5 個核心重點

Multiclass 的難點不是「不能算 Precision / Recall」，而是「positive class 不再唯一」。

Confusion Matrix 先看 diagonal 是否強，再看哪些 off-diagonal 類別互相混淆。

One-vs-All（OvA）把某一 class 當 positive，其餘所有 class 合併成 negative，因此可以重用 TP / FP / FN、Precision、Recall。

Macro = 每個 class 同權；Micro = 每個 sample／global count 對總分的影響按自然頻率反映。

最後不能只問「哪個 metric 高」，而要問：哪種錯誤最重要？rare class 是否不能漏？business objective 是什麼？

A2. Macro vs Micro — 最短理解

最重要的一句

Macro = 每個 Class 一票；Micro = 每個 Sample 一票。

比較角度

Macro Averaging

Micro Averaging

核心視角

每個 class 同等重要

每個 sample 同等重要

計算順序

先算每個 class 的 metric，再平均

先把各 class 的 TP/FP/FN 合併，再算 global metric

少數類別

不容易被大類別掩蓋

若少數類別很少，對總分影響自然較小

適合問題

「每一類平均做得怎樣？」

「所有樣本整體做得怎樣？」

典型課件情境

Rare disease、Quality Control

Document Classification、Image Recognition

A2.1 自製數字例子：為什麼 Macro 與 Micro 可以差很多？

以下是為理解而設的示例，不是課件原始數據。假設三個 class 的 Precision 分別是 Healthcare 90%、Finance 60%、Technology 30%。

Macro Precision = (0.90 + 0.60 + 0.30) / 3 = 0.60。這代表不論三類各有多少樣本，每一類都佔三分之一。

若 Healthcare 樣本極多，而且做得很好，而另外兩類樣本很少，Micro 會更受 Healthcare 的大量樣本影響，因此整體分數可以明顯高於 Macro。這不是矛盾，而是兩個指標在回答不同問題。

判讀陷阱

Micro 很高，不代表每一個 class 都很好；Macro 很低，往往提示有某些 class（尤其 minority / rare class）表現明顯較弱。

A3. Multiclass ROC Curves — 圖表真正表達什麼？

課件第 8 頁的四條 ROC 線（Healthcare、Finance、Technology、Retail）可理解為：同一 multiclass model，針對每個 class 分別做 One-vs-All threshold evaluation，而不是四個不同模型。

圖上元素

意思

越好方向

Y 軸：True Positive Rate (TPR)

真正屬於該 class 的樣本，有多少被成功抓到；TPR 等同 Recall。

越高越好

X 軸：False Positive Rate (FPR)

不屬於該 class 的樣本，有多少被錯誤判成該 class。

越低越好

每一條 ROC curve

某一 class vs All Others，在不同 threshold 下的 TPR / FPR trade-off。

越靠左上角越好

A3.1 為什麼 ROC 有很多轉折點？

因為模型不是只用一個 threshold。當 threshold 改變，哪些樣本被判成 positive 也會改變，因此 TP、FP、FN、TN 會改變，TPR 與 FPR 也跟着改變。把不同 threshold 下的點連起來，就形成 ROC curve。

Threshold trade-off

Threshold 降低：通常會抓到更多真正 positive（TPR/Recall 上升），但也更容易把 negative 錯抓成 positive（FPR 上升）。Threshold 提高：通常可減少誤報，但可能漏掉更多真正 positive。

A3.2 如何讀第 8 頁這張圖？

四條線代表四個 class 的 One-vs-All ROC，而不是四個不同分類模型。

曲線越靠左上角，代表在較低 FPR 下已能取得較高 TPR，class separability 通常較好。

本課件圖中，Technology（綠線）在不少低 FPR 區段視覺上高於其他線，因此可以說它在這些 threshold 區段的 TPR/FPR trade-off 較好。

但投影片沒有列出精確 AUC 數字，也沒有指定最佳 threshold，因此不能從課件直接聲稱某個 class 的 AUC 等於某一精確值。

A3.3 延伸補充：AUC（非課件此頁直接列出的數值）

AUC = Area Under the ROC Curve，常用來把整條 ROC 的整體辨別能力濃縮成一個數字。一般而言，AUC 越大，代表跨 threshold 的 ranking / separability 越強；AUC = 0.5 通常接近隨機排序的基準。這是額外概念補充，原投影片第 8 頁並沒有提供各 class 的實際 AUC 值。

A4. 30 秒考試／作業記憶版

① Multiclass = 3 個或以上 classes。

② One-vs-All = 每次把一個 class 當 Positive，其餘全部當 Negative。

③ Confusion Matrix = 看正確分類是否集中在 diagonal，以及哪些 classes 互相混淆。

④ Precision = 我說是這一類時，有多可信；Recall = 真正這一類，我抓到多少。

⑤ Macro = 每個 Class 一票；Micro = 每個 Sample 一票。

⑥ ROC = 看不同 threshold 下 TPR 與 FPR 的 trade-off；每個 class 可以各有一條 OvA ROC。

⑦ 最後選 metric 要配合 class importance、error cost 與 business objective。

整章一句話

多類別評估的核心不是尋找唯一「最好」的 metric，而是先找出每個 class 的錯誤模式，再用 One-vs-All、Macro / Micro 與 ROC 從不同角度評估，最後回到實際業務目標決定什麼錯誤最重要。

A5. 來源與補充範圍說明

課件／影片直接支持：multiclass confusion matrix、One-vs-All、per-class Precision / Recall、Macro vs Micro 的計算與選擇邏輯、per-class One-vs-All ROC 及跨 thresholds 的分析。

本附錄額外加入：為方便理解而設的自製數字例子、FPR/TPR 的白話拆解，以及 AUC 的一般概念。這些補充用來幫助理解，不代表投影片提供了新的實測數值。

Updated study supplement: Macro vs Micro + Multiclass ROC interpretation

## Connections

[[Supervised Learning MOC]] · [[Supervised Learning - Module 3 MOC]] · [[Logistic Regression Intuition]] · [[The Loss Function in Logistic Regression]]

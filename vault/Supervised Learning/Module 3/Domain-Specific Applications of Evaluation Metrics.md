---
course: Supervised Learning
module: 3
status: curated
tags:
  - supervised
  - module-3
  - evaluation
publish: true
---

# Domain-Specific Applications of Evaluation Metrics

> [!info] Learning position
> Supervised Learning → Module 3 → Topic 3

## Domain-Specific_Applications_of_Evaluation_Metrics_詳細整理

Domain-Specific Applicationsof Evaluation Metrics

領域導向的分類評估指標：VIDEO + TXT + PDF 逐頁整合分析

Classification Methods · Daniel E. Acuna · University of Colorado Boulder

本文件目標：不是只背 Precision / Recall / F1 / AUC 的公式，而是理解：同一個 classifier 在不同領域，因為 False Positive (FP) 與 False Negative (FN) 的代價不同，所以「最佳指標」也會不同。

素材：13 頁 PDF、約 14 分 52 秒影片、完整 TXT 講稿。文件依 PDF 頁次逐頁解析，並把影片口述補充、例子、邏輯與重要差異整合到同一份筆記。

1. 全章核心：Metric 不應脫離 Domain

整個單元其實只圍繞一個問題：在你的領域裡，False Positive 與 False Negative，哪一種錯誤更昂貴、更危險、更難以補救？

第一步不是先選 Precision 或 Recall，而是先定義「Positive class 到底代表什麼」。影片特別提醒：正類的定義一變，FP / FN 的商業意義也會跟著反轉。

第二步比較 FP 與 FN 的成本。成本不只包括金錢，也可包括生命安全、客戶體驗、聲譽、法律／監管風險、人工資源與時間。

第三步看決策形式：是單一門檻的 go/no-go 決策，還是要把所有案例排序？前者常使用 Precision / Recall / F1，後者常使用 AUC/ROC。

第四步才是驗證：選到的 metric 是否真的對應 stakeholder 可以採取的行動，以及 business objective。

Precision

TP / (TP + FP)  —  你預測為 Positive 的案例中，有多少真的為 Positive。

Recall

TP / (TP + FN)  —  現實中所有真正 Positive 的案例，有多少被模型抓到。

F1

2 × Precision × Recall / (Precision + Recall)  —  當 Precision 與 Recall 都重要時，用調和平均取得平衡。

AUC / ROC

Area under ROC curve  —  衡量模型跨不同 threshold 的排序／區分能力。

Relative Cost

Cost(FP) / Cost(FN)  —  課件第 12 頁用此比率作為快速 metric 選擇框架。

影片時間軸（依畫面切換偵測）

PDF頁

影片時間

主題

優先指標

1

00:00–00:54

課程定位

—

2

00:54–01:31

內容總覽

—

3

01:31–04:43

FP vs FN 成本框架

依成本

4

04:43–06:22

Disease Screening

Recall

5

06:22–07:56

Treatment Decisions

Precision

6

07:56–09:34

Risk Scoring

AUC

7

09:34–10:51

Fraud Detection

F1

8

10:51–11:48

Credit Risk

Precision

9

11:48–12:31

Content Moderation

Recall

10

12:31–13:01

Quality Control

Recall

11

13:01–13:27

Marketing Targeting

Precision

12

13:27–14:21

Domain Analysis Framework

Framework

13

14:21–14:49

Summary

Domain-driven

PDF 第 1 頁 — Domain-Specific Applications of Evaluation Metrics

PDF 第 1 頁：課程封面

這一頁在建立什麼觀念？

這不是另一個「背 metric 定義」的章節，而是把前面學到的分類評估指標搬到真實領域，問：不同 business / safety / regulatory context 下，到底應該優先優化哪個 metric？

VIDEO / TXT 補充

影片開場指出，之前課程曾用 student success 問題介紹分類；本章改用多個產業，讓學生學會把同一套概念遷移到自己的 domain。

影片的教學目標是：最後能對 decision makers 解釋，為什麼某個 classifier 應以某個 metric 評價，而不是只報一個 accuracy。

影片第 1 張投影片可見講師本人以疊加畫面講解，之後主要以 slide + voice-over 進行。

一句話記憶：Metric selection = 技術問題 + 決策成本問題。模型好不好，不能脫離「錯一次會發生什麼」。

PDF 第 2 頁 — Contents of This Video

PDF 第 2 頁：章節內容

頁面內容

Domain-specific cost structures and trade-offs：不同領域的 FP/FN 成本與取捨。

Healthcare：篩查 (screening) 與治療建議 (treatment) 會選不同指標。

Finance：fraud detection 與 credit risk。

Medical diagnostics：AUC 與 probability/risk ranking。

Manufacturing、Marketing：品質檢查與客戶 targeting。

最後形成一套 framework，從 domain 成本反推 metric。

VIDEO / TXT 的真正重點

講師不是想讓你記住「醫療 = Recall、金融 = Precision」這種固定配對，而是希望你看到每個例子背後都先做成本分析，再選 metric。換一個正類定義、成本結構或決策流程，答案就可能改變。

學習策略：讀後面所有例子時，都問同一組問題：Positive 是什麼？FP 是什麼？FN 是什麼？哪個更痛？錯誤能不能被第二階段補救？

PDF 第 3 頁 — The Core Question

PDF 第 3 頁：核心決策矩陣

核心問題：When is a false positive worse than a false negative?

這頁是整章最重要的一頁。講師在影片用了超過 3 分鐘解釋它，因為後面所有 domain 例子都是這個矩陣的具體化。

先定義 Positive class

影片特別提醒：你必須先決定「Positive prediction」代表什麼。若 Positive = 成功、Positive = 有病、Positive = fraud、Positive = defective，則 FP/FN 的意思完全不同。沒有這一步，Precision / Recall 的選擇沒有意義。

四類 Context Factors

Cost of Errors：金錢、安全、聲譽。

Resource Constraints：預算、時間、可執行決策的人員容量。

Regulatory Requirements：法律、監管與公平性要求。

Business Objectives：增長、安全、效率等不同優先次序。

Decision Matrix

FP Cost

FN Cost

Choose

High

Low

Precision

Low

High

Recall

Equal

Equal

F1-Score

Variable

Variable

AUC/ROC

Priority

f(FP Cost, FN Cost, Context)  —  課件把 metric selection 寫成 context-dependent function。

PDF 第 4 頁 — Healthcare: Disease Screening

PDF 第 4 頁：疾病大規模篩查

情境拆解

Positive = 患有／疑似患有嚴重疾病。

False Negative = 真正有病，但模型判斷為沒有病 → 可能延誤診斷，甚至致命。

False Positive = 沒有病，但模型先標成可疑 → 造成焦慮與後續檢查成本，但可以用更精細檢查排除。

優先

Recall = TP / (TP + FN)  —  因為 Cost(FN) >> Cost(FP)。

課件例子：Mammography Screening

Recall target：約 95%。

Precision：約 30%。

課件接受很多 false alarms，理由是 early detection 能救命，而 follow-up test 可以過濾錯誤警報。

Decision Rule：When lives are at stake, optimize for recall。

直覺：寧願多叫一些健康的人回來複檢，也不要把真正的癌症病人說成「沒事」。

補充技術辨析（非課件原文）：投影片把 Precision ~30% 後的「70%」稱為 false positive rate。嚴格來說，1 − Precision = 70% 表示預測為陽性的案例中約 70% 是 false positives（false discovery proportion）；傳統 FPR 的分母是所有真實 negative，兩者不是同一個量。

PDF 第 5 頁 — Healthcare: Treatment Decisions

PDF 第 5 頁：高風險／高成本治療建議

為什麼同樣是 Healthcare，Metric 反過來？

Positive = 建議進行某項 risky / expensive treatment。

False Positive = 其實不適合治療，模型卻建議做 → 直接帶來身體傷害與高成本。

False Negative = 其實適合，但模型暫時沒有推薦 → 通常代表延後，很多情況仍可再評估或選 alternative treatment。

因此 Cost(FP) >> Cost(FN)，要提高「每一次推薦的可信度」。

優先

Precision = TP / (TP + FP)  —  模型一旦建議高風險介入，就希望大多數推薦都是正確的。

Real-world example

Surgical Recommendations：課件給出 precision target ~80%。

允許 lower recall，也就是採取比較 conservative 的策略。

可以隨新資料重新評估，因此「暫時漏掉」有時比「錯做高風險治療」更可接受。

來源內部差異：TXT/影片在這一段最後一句口述成「in these cases, use recall」，但同一段前後論述、PDF 公式與 Decision Rule 都明確是 Precision。這看起來是講師口誤；本文件保留並標示這個差異，而不把它當作新的規則。

PDF 第 6 頁 — Medical Diagnostics: Risk Scoring

PDF 第 6 頁：病人風險排序與 AUC

這裡不是單一 yes/no，而是 Ranking 問題

情境是把病人按 treatment priority 排序，例如 emergency、urgent、routine。這時醫生可能在不同資源狀況下使用不同 threshold，因此不能只看某一個固定 threshold 下的 Precision / Recall。

優先

AUC = area under ROC curve  —  看模型在一系列 threshold 上區分 positive / negative 的能力。

課件要求 good discrimination across all thresholds。

Emergency Department Triage：課件給出 AUC target > 0.85。

同一個 risk score 可以支援多個操作閾值，對應不同資源 allocation。

Decision Rule：When ranking matters, optimize for AUC。

AUC 直覺：如果隨機抽一個高風險與一個低風險案例，AUC 越高，模型越常把真正高風險者排在前面。

補充技術辨析（非課件原文）：投影片同時寫「well-calibrated probabilities」，影片也把 AUC 與可靠 probability estimates 放在一起。一般 ML 定義下，AUC 主要衡量 ranking / discrimination，不直接衡量 probability calibration；若需要「預測 0.8 就真的約有 80% 發生」，還要另外看 calibration。

PDF 第 7 頁 — Finance: Fraud Detection

PDF 第 7 頁：即時交易 fraud monitoring

FP 與 FN 都會傷害業務

Positive = fraud transaction。

False Positive = 合法交易被當 fraud → 卡被擋、交易失敗、客戶體驗受損甚至流失。

False Negative = fraud 被放過 → 直接 financial loss。

課件把兩者成本視為大致相近，因此需要 balance Precision 與 Recall。

優先

F1 = 2 × Precision × Recall / (Precision + Recall)  —  兩個指標的 harmonic mean，任一邊很差都會拉低 F1。

影片補充

Fraud monitoring 需要 milliseconds 級決策。

Fraud pattern 會動態改變，所以 threshold 也可能依 customer / context 調整。

課件示例 F1 target 約 0.75，並提到 custom cost weighting。

為什麼不只看 Accuracy？：Fraud 通常是少數類別；即使全都預測成合法，Accuracy 也可能看起來很高，但 fraud detection 實際上完全失效。因此這裡用 Precision / Recall / F1 的框架更有意義。

PDF 第 8 頁 — Finance: Credit Risk

PDF 第 8 頁：貸款 default / 高風險標記

核心：錯誤拒絕的成本與監管公平性

情境：Loan default prediction / credit scoring。

若 Positive 定義為「high-risk borrower」，False Positive = 把其實可還款的人錯標為高風險。

這種錯標可能造成 lost business、legal risk，也會觸發 fair lending / discrimination 的監管問題。

課件把 bad loan 視為相對可預期、可管理的損失，因此重點放在 precision of high-risk flagging。

優先

Precision = TP / (TP + FP)  —  一旦標記某人為 high risk，盡量確保這個標記真的成立。

Constraints

Fair lending laws

Profit margins

Portfolio balance

Equal opportunity across demographics

重要前提：這一頁再次說明「Positive class 定義」的重要性。如果你把 Positive 改成「會正常還款」而不是「high risk」，FP/FN 的商業含義與 metric 解讀會改變。

來源的簡化：課件最後寫「when regulation matters, prioritize fairness and precision」。Fairness 並不是單一 Precision 就能完全衡量；這裡應理解成：除了模型效能之外，監管與群體公平性是額外 constraint。

PDF 第 9 頁 — AI Systems: Content Moderation

PDF 第 9 頁：內容審核

為什麼先 Recall，再靠第二階段補 Precision？

Positive = harmful content。

False Negative = 有害內容沒有被抓到，可能快速傳播。

False Positive = 正常內容被暫時誤攔，通常可人工覆核或恢復，屬較可逆的錯誤。

所以第一階段自動系統應「寧可敏感一點」，優先 Recall。

優先

Recall = TP / (TP + FN)  —  Cost(FN) >> Cost(FP)。

Two-stage process

AI stage：課件示例 98% recall，先大範圍攔截。

Human review：課件示例 85% precision，再把誤報過濾掉。

這是一個很重要的系統設計觀念：不是要求第一個模型同時完美，而是讓不同 stage 各自負責不同 error trade-off。

可泛化模式：高 Recall 自動篩選 → 高 Precision 人工／昂貴檢查確認。醫療 screening、品質控制、AML alert triage 都可用類似思維。

PDF 第 10 頁 — Manufacturing: Quality Control

PDF 第 10 頁：生產線瑕疵檢測

Positive = Defective Product

False Negative = 瑕疵品被判為正常並出貨 → recall、安全事故、聲譽損害。

False Positive = 良品被判為瑕疵 → 浪費或多做一次檢查，成本通常較可控。

因此課件設定 Cost(FN) >> Cost(FP)，優先 Recall。

優先

Recall = TP / (TP + FN)  —  安全與品牌風險高時，漏掉 defect 最危險。

Automotive Parts 例子

Recall target：99%+，幾乎所有 defect 都要抓到。

Moderate precision 可以接受。

Multi-stage testing：Quick screen → detailed inspection。

Testing cost 可預測，但 safety recall 與 reputation damage 可能非常昂貴。

與第 9 頁的共同結構：兩者都採「第一階段 high recall，再用第二階段檢查處理 false positives」。這是成本不對稱時很常見的 production design。

PDF 第 11 頁 — Marketing: Customer Targeting

PDF 第 11 頁：昂貴行銷活動的客戶 targeting

每一次 Contact 都要付錢，所以 FP 變昂貴

Positive = 很可能會回應／轉換、值得被 contact 的客戶。

False Positive = 其實不會轉換，卻花成本接觸他 → 浪費 marketing budget。

False Negative = 漏掉一個可能客戶 → 失去機會，但可在後續 campaign retarget。

因此 Cost(FP) > Cost(FN)，課件建議 Precision。

優先

Precision = TP / (TP + FP)  —  把有限預算集中到最有把握的 customer。

ROI

(Revenue − Costs) / Costs  —  課件把 campaign metric 與最終商業 ROI 接起來。

Email campaign 的 precision target 會隨 contact cost 改變。

Budget constraints 驅動 threshold：預算越少，往往越只選 score 最高的一小群人。

課件提到 ROI requirements 通常 200%+，作為例子。

關鍵理解：Metric 不是終點。Precision 高的真正目的，是提高「每一筆行銷支出換回多少有效轉換／收入」的效率。

PDF 第 12 頁 — Domain Analysis Framework

PDF 第 12 頁：四步驟 Domain Analysis Framework

Step 1 — Cost Analysis

Relative Cost

Cost(FP) / Cost(FN)  —  以兩類錯誤的相對成本做第一輪選擇。

Ratio > 1：FP 比 FN 貴 → prioritize Precision。

Ratio < 1：FN 比 FP 貴 → prioritize Recall。

Ratio ≈ 1：兩者接近 → use F1-Score。

Step 2 — Context Factors

Regulatory requirements

Resource constraints

Business objectives

Step 3 — Metric Selection

Context

Metric

Lives at stake

Recall

Money at stake

Precision

Ranking needed

AUC

Balance needed

F1-Score

Step 4 — Validation

Does the metric align with business goals?

Can stakeholders act on the results?

Is improvement actionable?

PDF 第 13 頁 — Summary: Domain-Driven Metric Selection

PDF 第 13 頁：全章總結

課件分類總結

類型

課件例子

High Recall

Healthcare screening; Content moderation; Manufacturing QC; Security systems

High Precision

Medical treatment; Credit approval; Marketing campaigns; Resource allocation

AUC/ROC

Medical diagnostics; Credit scoring; Risk ranking; Resource prioritization

Balanced (F1)

Fraud detection; General classification; When costs are similar

Key Principle：Let domain costs drive metric choice。這一句就是全章最後要帶走的規則。

容易混淆的地方：第 13 頁同時把 resource allocation 放在 High Precision、resource prioritization 放在 AUC。可以理解為：如果是「是否執行一個昂貴介入」，每次 positive decision 的正確性很重要；如果是「把資源按風險排序」，ranking quality 更重要。

2. 一張表看懂所有 Domain

Domain

Positive 定義

FP 的代價

FN 的代價

優先 Metric

核心原因

Disease screening

有病/疑似有病

誤報、焦慮、複檢

漏診、可能致命

Recall

FN 極貴

Risky treatment

適合高風險治療

錯做治療、傷害與成本

延遲/可再評估

Precision

FP 極貴

Medical risk scoring

高風險/高優先

視 threshold 而變

視 threshold 而變

AUC

需要排序與多 threshold

Fraud detection

詐騙交易

擋合法交易、流失客戶

放過 fraud、金錢損失

F1

兩邊都重要

Credit risk

高風險借款人

錯誤拒絕、法律/公平風險

放出 bad loan

Precision

high-risk flag 要可信

Content moderation

有害內容

誤刪，可覆核

有害內容擴散

Recall

FN 更難補救

Quality control

瑕疵品

良品被攔/多檢查

瑕疵品出貨、安全/聲譽

Recall

安全優先

Marketing targeting

高轉換客戶

浪費 campaign 成本

漏掉機會，可 retarget

Precision

預算有限

3. 最實用的 Decision Tree

先定義 Positive：你的模型說「Yes」到底代表疾病、詐騙、高風險、瑕疵，還是值得行銷？

寫出 FP：模型說 Yes，但現實是 No。這個錯誤會造成什麼？

寫出 FN：模型說 No，但現實是 Yes。這個錯誤會造成什麼？

若 FP 明顯更貴 → 優先 Precision。

若 FN 明顯更貴 → 優先 Recall。

若 FP/FN 都很重要且接近 → 用 F1 作為平衡指標。

若你要的是跨多個 threshold 的排序品質，而不是單一 cutoff → 看 ROC/AUC。

最後加入 regulation、resources、human review、business objective，再決定真正 production threshold。

4. 短答題／作業可直接套用的回答框架

模板：「在此 domain 中，我先把 Positive 定義為 __。False Positive 會造成 __，False Negative 會造成 __。由於 Cost(FP) [大於/小於/約等於] Cost(FN)，因此主要評估指標應使用 __。此外還需考慮 __（監管/資源/公平/人工覆核/ROI），最後再用 validation 檢查該 metric 是否與 business goal 一致。」

5. 來源交叉核對結論

PDF 與影片整體結構一致：影片逐張依序講解 13 頁投影片。

TXT 基本上完整記錄講師口述，補充了「先定義 Positive class」、student success 舊例、threshold trade-off 及 decision maker 的實務語境。

主要明顯差異是 Treatment Decisions 段落末尾口述「use recall」，與該頁其餘內容和公式矛盾，已在第 5 頁分析中標記。

部分投影片採教學簡化表述（例如 AUC 與 calibration、mammography 70% 的用語），本筆記以「補充技術辨析」獨立標示，沒有把補充內容冒充成課件原文。

## Connections

[[Supervised Learning MOC]] · [[Supervised Learning - Module 3 MOC]] · [[Data Pre-Processing]] · [[Evaluation Metrics_Confusion Matrix, Accuracy, Error Rate]]

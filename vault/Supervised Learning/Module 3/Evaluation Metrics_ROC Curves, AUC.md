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

# Evaluation Metrics_ROC Curves, AUC

> [!info] Learning position
> Supervised Learning → Module 3 → Topic 6

## Evaluation_Metrics_ROC_Curves_AUC_詳細分析_更新版

Evaluation Metrics IIIROC Curves, AUC

影片 + TXT + PDF 逐頁詳細分析筆記

Classification Methods | University of Colorado BoulderDaniel E. Acuna

資料來源PDF：9頁；影片：約 9分56.6秒；TXT：完整影片逐字稿。本文以 PDF 視覺內容為主軸，再用影片與逐字稿補足動畫、公式、口頭解說與應用脈絡。

特別注意：PDF 第4頁的靜態匯出只剩標題，但影片播放時會逐步出現 TPR/FPR 公式、定義與 threshold 圖。因此第4頁分析會特別以影片畫面還原缺失內容。

1. 單元核心脈絡

這個單元的主線不是單純「背 AUC 數字」，而是先理解分類模型通常輸出機率，再理解 threshold（分類門檻）如何改變預測結果，最後把不同 threshold 下的 TPR 與 FPR 組合起來形成 ROC curve，並用曲線下面積 AUC 將整體 ranking 能力濃縮成一個數字。

最重要的一條因果鏈模型輸出 probability → 選 threshold → 產生 predicted label → confusion matrix 改變 → TPR/FPR 改變 → 掃過所有 threshold 得到 ROC curve → ROC 曲線下面積就是 AUC。

影片中特別強調 ROC/AUC 是「threshold-independent evaluation」：意思不是完全沒有 threshold，而是它不只看單一固定 threshold，而是綜合所有可能 threshold 的行為。這使它很適合比較不同模型的排序能力。

概念

公式 / 定義

本課程中的意思

TPR / Recall / Sensitivity

TP / (TP + FN)

真正會成功的學生中，被模型正確判為成功的比例

FPR

FP / (FP + TN)

真正會失敗的學生中，被模型錯判為成功的比例

FPR 與 Specificity

FPR = 1 - Specificity

FPR 越低，代表對負類的誤報越少

AUC

Area under ROC curve

將所有 threshold 下的 TPR/FPR 表現濃縮成一個排名能力指標

2. 影片時間軸與PDF頁面對照

頁面

影片約略時間

主題

PDF 1

00:00-00:37

標題與單元定位

PDF 2

00:37-01:17

本影片內容與學習目標

PDF 3

01:17-02:23

Classification threshold

PDF 4

02:23-04:19

TPR、FPR、Sensitivity、Specificity 與 threshold trade-off

PDF 5

04:19-05:39

ROC curve、完美模型、random baseline、operating point

PDF 6

05:39-07:02

AUC 數字與機率式解讀

PDF 7

07:02-07:55

多模型 ROC/AUC 比較

PDF 8

07:55-08:58

學生成功預測的資源與政策應用

PDF 9

08:58-09:56

總結

PDF 第1頁｜Evaluation Metrics III - ROC Curves, AUC

影片對應時間：約 00:00-00:37

圖：PDF 第1頁原始投影片

PDF 畫面分析

封面列出主題 ROC Curves 與 AUC，屬於 Classification Methods 的評估指標系列。

影片 + TXT 補充

影片開場先把 ROC/AUC 定位為分類模型的另一組評估方式，重點是「跨 threshold」看整體表現，而不是只看某一個 0.5 cutoff。

講者強調它們特別適合觀察模型如何「ranking predictions」：也就是模型是否傾向把真正正類的分數排在真正負類之前。

學生成功預測是全片的持續例子：正類可理解為會成功/通過的學生，負類則是會失敗的學生。

概念拆解與圖表解讀

ROC/AUC 不是取代 confusion matrix、precision、recall，而是從「所有 decision thresholds」的角度補充評估。

本頁真正要建立的心理模型：分類器往往先給 probability/score，最終 yes/no label 是後續 threshold 決策的結果。

本頁一句記憶先記住：ROC 看的是整條 trade-off 曲線；AUC 把整條曲線濃縮成一個數字。

PDF 第2頁｜Contents of This Video

影片對應時間：約 00:37-01:17

圖：PDF 第2頁原始投影片

PDF 畫面分析

本頁列出六項內容：ROC curve、TPR vs FPR、AUC interpretation、何時適用/不適用、模型比較，以及學生成功預測應用。

影片 + TXT 補充

逐字稿說 ROC/AUC 提供「comprehensive view ... across all possible thresholds」，核心價值是能觀察不同 intervention 嚴格程度下的模型行為。

影片將 threshold 與「stringent / lenient」連結：門檻越高越嚴格，越少樣本被判為 positive；門檻越低越寬鬆，越多樣本被判為 positive。

概念拆解與圖表解讀

這頁其實是一張 learning map。後面的內容順序是：先講 threshold，才有 TPR/FPR；有 TPR/FPR 才能畫 ROC；有 ROC 才能談 AUC；最後才談模型比較與決策。

投影片寫到「when ROC/AUC is appropriate vs inappropriate/misleading」，但本段影片對「何時 misleading」沒有展開具體反例，主要仍著重它何時有用與怎樣用。這是來源本身的內容缺口。

本頁一句記憶不要把 AUC 當成孤立公式；它是 threshold → TPR/FPR → ROC 的最後一步。

PDF 第3頁｜Understanding Classification Thresholds

影片對應時間：約 01:17-02:23

圖：PDF 第3頁原始投影片

PDF 畫面分析

左側用 P(student succeeds)=0.8、0.3、0.6 說明 classifier 輸出的是 success probability；右圖是實際 pass/fail 的預測分數分布，並畫出 0.3、0.5、0.7 三條 threshold。

影片 + TXT 補充

講者指出 binary classifier 通常不是直接吐出 pass/fail，而是先產生 class probability。要從 probability 變成 label，就必須做 threshold decision。

預設 threshold 通常是 0.5：如果模型對成功的預測機率高於一半，就判為 success。這只是常見預設，不代表任何任務都必須用 0.5。

Lower threshold（例如 0.3）會讓更多學生被判為 success；Higher threshold（例如 0.7）會讓更少學生被判為 success。

概念拆解與圖表解讀

圖上的紅色與藍綠色分布有重疊，這就是分類不可能完全零錯誤的原因。threshold 放在重疊區的不同位置，會改變兩種錯誤（FP/FN）的數量。

降低 threshold：positive 預測變多。結果通常是抓到更多真正 positive（TPR/Recall 上升），同時也錯把更多 negative 當 positive（FPR 上升）。

提高 threshold：positive 預測變少。結果通常是 FPR 降低，但也會漏掉更多真正 positive，因此 TPR/Recall 降低。

本頁一句記憶ROC 的本質就是：把 threshold 從高到低一路掃過，記錄每個 threshold 對應的 FPR 與 TPR。

PDF 第4頁｜True Positive Rate and False Positive Rate

影片對應時間：約 02:23-04:19

圖：PDF 第4頁原始投影片

PDF 畫面分析

PDF 靜態頁面只顯示標題，公式與圖表沒有被匯出。影片在動畫完成後會出現完整內容，因此本頁必須以影片補足。

跨來源發現：PDF 靜態匯出遺失動畫內容第4頁 PDF 只有標題；但影片在約 03:40 左右已完整顯示 TPR、FPR 公式、1-Specificity、學生情境定義與 threshold 曲線。因此若只看 PDF，會錯過本單元最重要的公式頁。

圖：影片約 03:40 畫面，用於還原第4頁動畫後內容

影片 + TXT 補充

影片畫面顯示 TPR = TP / (TP + FN) = Recall，並指出 TPR 也叫 Sensitivity 或 Recall。

影片畫面顯示 FPR = FP / (FP + TN)，並指出它等於 1 - Specificity。

學生情境中：TPR 是真正會通過的學生中，模型正確識別為通過的比例；FPR 是真正會失敗的學生中，模型卻錯判會通過的比例。

講者強調理想狀態是 TPR 高、FPR 低，但兩者通常存在 trade-off：把 threshold 調低以捕捉更多 positive 時，FPR 也往往上升。

概念拆解與圖表解讀

TPR 的 denominator 是所有「實際 positive」= TP + FN，所以它問的是「真正成功的人，我抓到了多少？」

FPR 的 denominator 是所有「實際 negative」= FP + TN，所以它問的是「真正失敗的人，我錯報成成功多少？」

影片中的 threshold 對照圖顯示，threshold 改變會同時改變 TPR 與 FPR。這兩條線不是要找單獨的最高點，而是用來理解 sensitivity 與 false alarm 之間的權衡。

本頁一句記憶TPR 要高；FPR 要低。ROC 圖的 y 軸就是 TPR，x 軸就是 FPR。

PDF 第5頁｜The ROC Curve

影片對應時間：約 04:19-05:39

圖：PDF 第5頁原始投影片

PDF 畫面分析

左圖比較 Perfect / Good / Average / Random / Poor model 的 ROC；右圖在同一條 student success ROC 上標出 Conservative、Balanced、Aggressive 三個 operating points。

影片 + TXT 補充

講者說把不同 thresholds 對應的 TPR/FPR 點全部計算出來，會形成一條 continuum，這條就是 ROC curve。

ROC 名稱源自 Receiver Operating Characteristic；影片簡述其歷史背景與雷達偵測靈敏度有關。

完美 classifier 要同時做到最低 FPR 與最高 TPR，因此曲線會沿左側迅速上升到左上角，再沿上邊到 (1,1)，形成面積 1 的「方形」外框。

概念拆解與圖表解讀

左上角 (FPR=0, TPR=1) 是理想點：沒有 false positive，又抓到所有 true positive。曲線越靠近左上角通常越好。

對角虛線代表 random guessing，AUC=0.5。投影片示例：Good Model 約 0.85、Average 約 0.65、Poor 約 0.3。

右圖的 Conservative / Balanced / Aggressive 是用來說明不同 operating strategy / threshold 取捨的概念標示。嚴格而言，同一模型的真正 operating points 應位於同一條 ROC curve 上；投影片中的三個彩色圓點是教學性示意，視覺上並沒有全部精確落在青色 ROC 曲線上，因此不要把它們當作可精確讀值的座標。

本頁一句記憶ROC curve 是「同一模型在不同 threshold 下」的軌跡；不是每一個點代表一個新模型。

PDF 第6頁｜Area Under the Curve (AUC)

影片對應時間：約 05:39-07:02

圖：PDF 第6頁原始投影片

PDF 畫面分析

本頁列出 AUC=1.0、0.7、0.5、<0.5 的解讀，並用一條示例 ROC 顯示 AUC 約 0.82。

影片 + TXT 補充

AUC 就是 ROC 曲線下的面積；它將所有 threshold 的表現濃縮成單一數字。

投影片標示：AUC=1.0 是 perfect classifier；AUC=0.7 是 fair performance；AUC=0.5 是 random guessing；AUC<0.5 比 random 更差，影片甚至說可以「flip predictions」。

影片補充一個非常重要的 probabilistic interpretation：AUC 等於模型把一個隨機 passing student 排在一個隨機 failing student 之上的機率。

概念拆解與圖表解讀

以圖中的 AUC≈0.82 為例，可以把它理解成：隨機抽一個真正 pass 與一個真正 fail 的學生，模型大約有 82% 機率給 pass 學生更高的 success score。

這也解釋為何 AUC 常被稱為 ranking metric：它不只是在 0.5 threshold 下看對錯，而是看分數排序是否普遍把正類排得更高。

來源只明確列出 1.0、0.7、0.5、<0.5 這幾個參考點，沒有提供完整 AUC 等級表，因此本筆記不額外創造課程未提供的分級規則。

本頁一句記憶AUC 越接近 1，代表整體 ranking 越強；0.5 約等於隨機排序。

PDF 第7頁｜Comparing Multiple Models

影片對應時間：約 07:02-07:55

圖：PDF 第7頁原始投影片

PDF 畫面分析

左圖疊加四個模型 ROC：Logistic Regression 0.68、Random Forest 0.74、SVM 0.66、KNN 0.66；右圖用 bar chart 再比較相同 AUC 數字。

影片 + TXT 補充

講者把 AUC 描述為很方便的 model comparison 指標，因為一個數字就能總結模型在全部 thresholds 的 ranking robustness。

在投影片的 toy example 中，Random Forest AUC=0.74 最高，因此講者說在 validation 階段會傾向選它。

概念拆解與圖表解讀

這頁示範兩種比較方式：ROC 曲線讓你看「哪一段 FPR 區域誰較好」；AUC bar chart 則提供整體排序。

Random Forest 0.74 > Logistic Regression 0.68 > SVM/KNN 0.66；但差距是否足以決定實務模型，來源沒有進一步談統計不確定性或成本，因此此處只做課程內的相對比較。

如果兩條 ROC 曲線交叉，單一 AUC 仍只是一個整體摘要；本頁的主要教學目的仍是「用 AUC 快速比較模型」。

本頁一句記憶本例 validation winner = Random Forest（AUC 0.74），因為它的 AUC 在四個模型中最高。

PDF 第8頁｜Practical Applications in Student Success

影片對應時間：約 07:55-08:58

圖：PDF 第8頁原始投影片

PDF 畫面分析

左側列出 ROC/AUC 的四個實務用途；右圖把 ROC operating region 與 tutoring/support resources 連結，分成 low、moderate、high cost regions。

影片 + TXT 補充

來源列出的用途包括 model selection、feature evaluation、semester comparisons、early vs late prediction。也就是 AUC 不只可比演算法，也可比較新特徵、不同學期與預測時間點。

講者說真正的 operating point 要依 institutional priorities 與 available resources 決定。

如果 tutoring resources 很有限，應偏向低 FPR 區域，追求較高 precision，避免把太多實際不需要支援的人納入；代價是可能漏掉一些需要的人，因此 recall 較低。

如果有 comprehensive support programs、資源較充足，可以容忍較多 false positives，操作在較高 TPR/Recall 的區域，以捕捉更多學生。

概念拆解與圖表解讀

這頁把「model evaluation」和「decision policy」分開：AUC 可以幫你比較模型整體 ranking，但真正落地仍要選 threshold。

ROC 上不同 operating points 對應不同成本結構。低 FPR 通常代表少誤報、服務對象更精準；高 TPR 則代表覆蓋更多真正 positive，但需要承受更多誤報與資源消耗。

因此沒有一個 universal best threshold；最佳 threshold 是由任務成本、資源與優先目標共同決定。這正是右圖 resource regions 的意義。

本頁一句記憶AUC 幫你選「哪個模型」；ROC operating point 幫你選「這個模型實際怎麼用」。

PDF 第9頁｜What We’ve Covered

影片對應時間：約 08:58-09:56

圖：PDF 第9頁原始投影片

PDF 畫面分析

總結六項重點：threshold、TPR vs FPR、threshold-independent ROC、AUC、適用性，以及 model comparison/threshold selection。

影片 + TXT 補充

影片最後再次總結：ROC 是所有 thresholds 對應的 TPR/FPR 組合；AUC 是 ROC curve 下的面積，是對 classifier 行為的整體概括。

講者再次強調 ROC/AUC 適合用來比較模型，以及理解「catch positive」與「negative mistakes」之間的 trade-off。

概念拆解與圖表解讀

把全章壓縮成一句話：threshold 改變 confusion matrix；confusion matrix 改變 TPR/FPR；所有 TPR/FPR 點連成 ROC；曲線下面積就是 AUC。

另外要分清「threshold-independent evaluation」與「threshold selection」並不矛盾：AUC 用全部 thresholds 評價模型，最後實務部署仍需要選一個 threshold。

課程標題提到 ROC/AUC 何時可能 inappropriate/misleading，但影片沒有給出具體情境清單；若要延伸到極度 class imbalance、precision-recall curve 等內容，需另行補充，不應假裝是本影片已講授的部分。

本頁一句記憶考試/作業最應掌握：TPR、FPR 公式；ROC 軸；AUC=0.5/1.0 的意思；threshold 對 TPR/FPR 的方向性影響；AUC 的 ranking 解讀。

3. 全章超精簡總結

Classifier 先輸出 score/probability，不是天然就有 pass/fail。

Threshold 把 score 轉成 label；threshold 降低會讓更多樣本判成 positive，通常 TPR↑、FPR↑。

TPR = TP/(TP+FN) = Recall/Sensitivity；FPR = FP/(FP+TN) = 1-Specificity。

把每個 threshold 的 (FPR, TPR) 畫成點並連起來，就是 ROC curve。x軸=FPR，y軸=TPR。

Random guessing 約在對角線，AUC=0.5；perfect classifier AUC=1.0。曲線越靠左上角越理想。

AUC 可解讀為：隨機抽一個 positive 與一個 negative，模型把 positive 分數排得更高的機率。

AUC 適合做整體 model comparison；真正部署仍要根據成本、資源與優先目標選 operating threshold。

最常見混淆AUC 高不等於「某一個固定 threshold 的 accuracy 一定高」。AUC 在本課程中的角色是跨 thresholds 的 ranking / ROC 總結；部署時仍需選 threshold。

4. 來源一致性與缺口

TXT 與影片敘事一致，完整補足了 PDF 靜態頁面中沒有呈現的口頭解釋。

PDF 第4頁是最明顯的靜態匯出缺失：只有標題，影片才包含公式與圖。

PDF 第5、7頁的主要信息集中在圖表，而非可抽取文字；因此必須閱讀圖像本身才能做完整分析。

課程提到「ROC/AUC appropriate vs inappropriate/misleading」，但本影片沒有詳細列出 misleading 的具體案例；本文沒有自行補寫成課程內容。

整理依據：Evaluation Metrics_ROC Curves, AUC.pdf + 240P Evaluation Metrics_ROC Curves, AUC.mp4 + Evaluation Metrics_ROC Curves, AUC.txt

5. 課後問答補充：Threshold、Probability、ROC 與 AUC 再拆解

內容定位：本章前半部（Threshold、TPR/FPR、ROC、AUC、投影片中的模型 AUC 比較）直接延伸自原影片/PDF/TXT；分類演算法本身的工作原理（Logistic Regression、Random Forest、SVM、KNN 等）屬於一般機器學習背景補充，不是這支 ROC/AUC 影片逐一教授的內容。

5.1 Predicted Probability 到底是甚麼？

分類器通常先輸出一個 score / predicted probability，再用 threshold 把它轉成最終 label。以學生成功預測為例，P(Pass)=0.80 表示模型對「這一位學生」給出的 Pass probability 是 0.80。

學生

預測成功機率

Threshold 0.5

結果

A

0.80

≥ 0.5

Pass

B

0.60

≥ 0.5

Pass

C

0.40

< 0.5

Fail

D

0.20

< 0.5

Fail

最容易混淆的地方：0.80 不等於「模型 Accuracy = 80%」。它只是對學生 A 的個別 predicted probability。模型整體好不好，才用 Accuracy、Precision、Recall、F1、ROC/AUC 等 evaluation metrics 衡量。

5.2 Threshold 改變時，實際發生甚麼？

Threshold = 0.5：P(Pass) ≥ 0.5 → 判 Pass；P(Pass) < 0.5 → 判 Fail。

Threshold 降低（例如 0.3）：更容易判為 Positive / Pass，通常 TPR / Recall 上升，但 FPR 也可能上升。

Threshold 提高（例如 0.7）：判 Positive 更嚴格，通常 FPR 下降，但可能漏掉更多真正 Positive，因此 Recall / TPR 可能下降。

一句話記憶：Threshold 越低 = 越容易判 Positive；Threshold 越高 = 越嚴格判 Positive。

5.3 ROC、Operating Point、AUC 的完整關係

模型先產生 probability / score。

設定一個 threshold 後，得到 Pass/Fail 預測，進而得到 TP、FP、TN、FN。

由 confusion matrix 計算 TPR 與 FPR。

改很多個 threshold，就得到很多組 (FPR, TPR)；把它們連起來就是 ROC Curve。

ROC 曲線下面積就是 AUC，用一個數字總結整體 ranking / discrimination ability。

ROC Curve 回答：「模型在所有 threshold 下的 trade-off 是怎樣？」；AUC 回答：「整體排序能力有多強？」；Operating Point 回答：「真正部署時，我要在哪個 trade-off 上操作？」

5.4 Conservative / Balanced / Aggressive 怎樣理解？

策略

Threshold 直覺

重點

適用想法

Conservative

較嚴格地判 Positive

偏低 FPR、通常 precision 較高

資源有限，希望少誤報；代價是可能漏掉更多真正 Positive

Balanced

在誤報與漏報之間折衷

中間型 TPR / FPR

一般情境下做成本與覆蓋率的平衡

Aggressive

較寬鬆地判 Positive

偏高 TPR / Recall

不想漏掉真正 Positive；可接受較多 false positives

圖表閱讀提醒：投影片上的 Conservative / Balanced / Aggressive 彩色標記主要是概念性示意。嚴格的 ROC operating point 應該位於該模型的 ROC curve 上，因此不要把投影片三個彩點當作精確座標讀值。

5.5 Probabilistic AUC：最值得記的機率式解讀

AUC 可理解為：隨機抽一個真正 Positive / Pass 與一個真正 Negative / Fail，模型把 Positive 的 score 排在 Negative 之前的機率。

Pair

真正 Pass score

真正 Fail score

排序結果

例 1

0.85

0.30

正確：0.85 > 0.30

例 2

0.40

0.70

錯誤：0.40 < 0.70

AUC = 0.82：可直覺理解為隨機抽一正一負時，約有 82% 機會把真正 Positive 排得更高。

AUC = 0.50：大約一半排對、一半排錯，等同 random guessing 的 ranking 能力。

AUC = 1.00：每一對 Positive / Negative 都能正確排序。

不要混淆：AUC = 0.82 不是 Accuracy = 82%，也不是某一個學生有 82% 機會 Pass。AUC 是整體 pairwise ranking / discrimination 指標。

6. 延伸背景：常見分類演算法定義與簡單例子

來源界線：下面的演算法原理屬於一般 Machine Learning 背景知識，用來解釋投影片第7頁出現的 Logistic Regression、Random Forest、SVM、KNN，並延伸加入 Decision Tree、Naive Bayes、Neural Network。原 ROC/AUC 影片只把這些方法當作比較例子，沒有逐一教授其演算法細節。

6.1 Logistic Regression

最淺白比喻：「Attendance + GPA + Homework，各自有幾多權重？」

定義：把多個特徵做加權，經 logistic / sigmoid 轉成 0-1 之間的正類機率，再以 threshold 做分類。

學生例子：學生出席率高、GPA 高、功課完成 → 模型估計 P(Pass)=0.82；若 threshold=0.5，判 Pass。

優點：簡單、快、容易解釋 coefficient；輸出 probability。

限制：決策邊界通常較簡單，對非常複雜的非線性關係可能不足。

6.2 Random Forest

最淺白比喻：「找很多老師，每個老師用不同規則判斷，最後投票。」

定義：建立很多 Decision Trees，每棵樹從資料/特徵的不同子集學習，最後以投票或平均整合預測。

學生例子：Tree 1 看出席率、Tree 2 看 GPA、Tree 3 看功課……若 5 棵中 4 棵投 Pass，最後判 Pass。

優點：可處理複雜非線性與 feature interactions；通常預測表現強、較穩健。

限制：比單一 Logistic Regression 難解釋，計算量也較高。

6.3 SVM - Support Vector Machine

最淺白比喻：「找出 Pass / Fail 之間最清楚、最安全的分界線。」

定義：SVM（Support Vector Machine，支援向量機）尋找能把兩類分開、而且 margin 盡可能大的 decision boundary；最靠近邊界的資料點叫 Support Vectors。

學生例子：以出席率與 GPA 畫散點圖，SVM 尋找 Pass 與 Fail 之間最大 margin 的分界線。

優點：高維資料中常有效；配合 Kernel 可處理非線性 boundary。

限制：概念較抽象；C、Kernel 等超參數選擇會影響表現。

6.4 KNN - K-Nearest Neighbors

最淺白比喻：「看看跟這個學生最相似的幾個學生最後 Pass 還是 Fail。」

定義：對新樣本找距離最近的 K 個已知樣本，以鄰居的多數標籤決定分類。

學生例子：新學生出席率 75%、GPA 3.0；最近 5 位過往學生有 4 位 Pass、1 位 Fail → 預測 Pass。

優點：直觀、簡單，不需要複雜參數學習。

限制：預測時要計算距離，資料大時較慢；對 feature scaling 與 K 值敏感。

6.5 Decision Tree

最淺白比喻：「一步一步問問題：如果…咁就…」

定義：根據特徵與門檻不斷把資料分裂，形成一連串 if/then 規則，最後到達分類 leaf。

學生例子：Attendance > 80%？如果 Yes，再問 GPA > 2.8？Yes → Pass；No → Fail。

優點：非常容易解釋，規則直觀，可處理非線性。

限制：單棵樹容易 overfit，對資料中的小變化可能較不穩定。

6.6 Naive Bayes

最淺白比喻：「把多個特徵提供的證據合起來，比較哪一類機率更高。」

定義：利用 Bayes rule 做分類，並假設在給定類別後，各特徵條件獨立。

學生例子：比較 P(Pass | Attendance, GPA, Homework) 與 P(Fail | ...)，選較大的類別。

優點：計算快、適合文字/機率型任務，也常作 baseline。

限制：條件獨立假設在真實資料中往往不完全成立；特徵高度相關時可能影響表現。

6.7 Neural Network

最淺白比喻：「多層神經元學習複雜模式。」

定義：由多層 interconnected neurons 組成，透過權重與非線性 activation 學習複雜關係。

學生例子：Attendance、GPA、Homework 作為輸入，經多層 hidden units 後輸出 Pass probability。

優點：表達能力強，能學習複雜非線性與高階 interaction。

限制：可解釋性較低，通常需要較多資料、計算與調參。

6.8 Random Guess

最淺白比喻：「我不知道，擲銀仔。」

定義：Random Guess 不是真正學到資料規律的模型，只是隨機猜類別，用作最低 baseline。

學生例子：不使用 Attendance / GPA / Homework，只隨機輸出 Pass 或 Fail。

優點：提供一個「模型至少應該比它好」的參考基準。

限制：沒有學習能力與實際 predictive value；二元分類的 ROC AUC 基準約為 0.50。

6.9 八種方法一頁比較

方法

核心想法

可解釋性

複雜度

何時想到它

Logistic Regression

加權後估機率

高

低-中

需要可解釋、快速 baseline

Random Forest

多棵樹投票

中

中

非線性、特徵多、想要穩健表現

SVM

最大 margin 分界

中-低

中-高

邊界清楚、高維資料

KNN

鄰居多數決

中

中

資料不大、局部相似性重要

Decision Tree

if/then 分裂規則

高

中

需要規則式可解釋性

Naive Bayes

Bayes 機率 + 條件獨立

中-高

低

文字/機率型資料、快速 baseline

Neural Network

多層非線性學習

低

高

資料多、模式複雜、追求高表現

Random Guess

隨機猜

不適用

最低

只作 baseline

延伸圖卡｜分類方法對比總結

圖：課後延伸分類方法比較圖卡（非原課程投影片）

7. 如何閱讀第7頁的模型 ROC / AUC 比較

課程 toy example 的 AUC 排序為：Random Forest 0.74 > Logistic Regression 0.68 > SVM 0.66 ≈ KNN 0.66 > Random Guess 0.50。

非常重要：這只是投影片中的示例結果，不代表 Random Forest 在所有資料集都一定比 Logistic Regression / SVM / KNN 好。模型優劣取決於資料、特徵、調參、驗證方法與實務成本。

在相同 FPR 下，如果某條 ROC 曲線的 TPR 更高，代表同樣承受相同誤報率時，它能抓到更多真正 Positive。

如果一條 ROC 曲線在大部分範圍都更靠左上角，通常其 AUC 也會較大。

AUC 是整體摘要；實務上如果只關心某個特定低-FPR區域，也要直接看 ROC curve 那一段，而不能只看單一 AUC 數字。

7.1 最終記憶脈絡

Features（Attendance / GPA / Homework）

→ Classification Model

→ Probability / Score

→ Threshold

→ Pass / Fail Prediction

→ TP / FP / TN / FN

→ TPR + FPR

→ ROC Curve

→ AUC

四句必背：ROC = 所有 threshold 的地圖；AUC = 整張地圖的整體成績；Operating Point = 真正部署時站在哪個位置；Threshold = 把 probability 切成 Positive / Negative 的門檻。

補充整理說明

課程來源：Evaluation Metrics_ROC Curves, AUC.pdf + 240P Evaluation Metrics_ROC Curves, AUC.mp4 + Evaluation Metrics_ROC Curves, AUC.txt。

第5章主要是把課程內容用課後問答方式重新拆解；第6章演算法原理屬一般 ML 背景延伸，已明確與原課程內容分開。

第7章使用課程第7頁的 toy AUC 數字做閱讀示範；數字只代表該投影片示例，不應泛化成演算法固定排名。

## Connections

[[Supervised Learning MOC]] · [[Supervised Learning - Module 3 MOC]] · [[Evaluation Metrics_Precision, Recall, F1-Score]] · [[K-Nearest Neighbors Intuition]]

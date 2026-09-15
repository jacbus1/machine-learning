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

# Evaluation Metrics_Precision, Recall, F1-Score

> [!info] Learning position
> Supervised Learning → Module 3 → Topic 5

## Evaluation_Metrics_II_Precision_Recall_F1_Detailed_Analysis

EVALUATION METRICS II

Precision, Recall & F1-Score

PDF 逐頁詳細分析 + TXT / Video 講解交叉整理

本文件用途以 University of Colorado Boulder 的 9 頁課件為主軸，逐頁解釋投影片圖表、公式與例子；同時把影片講者在 TXT / Video 中補充的重點（imbalanced data、cost-sensitive mistakes、保守/積極策略、metric 選擇）整合進來。文件不以外部資料改寫原課程內容；所有「延伸理解」會明確標示為解釋或由投影片數字推算。

Classification Methods - Daniel E. Acuna - CU Boulder

0. 單元總覽：這章究竟在解決什麼？

這一章不是在問「模型整體猜對幾多？」而是進一步問：當正類（positive class）很重要、資料不平衡，或者兩種錯誤的代價不一樣時，模型到底犯了哪一種錯？影片開場特別指出，Precision 與 Recall 比單純 Accuracy 更適合 imbalanced dataset 與 cost-sensitive application。

一句話先記住Precision =「我預測為 Positive 的人裡面，有幾多真的 Positive？」Recall =「所有真的 Positive 裡面，我抓到幾多？」F1 =「Precision 與 Recall 都重要時，用一個數字衡量兩者的平衡。」

0.1 三個 metric 的核心視角

Metric

它盯住哪一群？

主要害怕的錯誤

Precision

Predicted Positive：模型說「會成功」的人

False Positive (FP)：其實不成功卻被判成功

Recall

Actual Positive：現實中真的成功的人

False Negative (FN)：真的成功卻被模型漏掉

F1-Score

同時看 Precision + Recall

任何一邊太低都會拉低分數

0.2 先把 Confusion Matrix 固定下來

第 3、4 頁使用同一個 student success confusion matrix。以「Pass / 成功」作 Positive class：TP=85、FN=15、FP=10、TN=90，共 200 名學生。這個矩陣是整章公式的共同底座。

格子

數值

意思

TP

85

實際 Pass，而且模型預測 Pass

FN

15

實際 Pass，但模型預測 Fail（漏掉成功者）

FP

10

實際 Fail，但模型預測 Pass（錯誤承諾）

TN

90

實際 Fail，而且模型預測 Fail

由同一矩陣可直接算出

Precision = 85 / (85 + 10) = 89.47%Recall = 85 / (85 + 15) = 85.00%

Precision 的分母是「模型預測 Pass 的全部人」= 95；Recall 的分母是「實際 Pass 的全部人」= 100。TN=90 不會直接進入這兩條公式。

0.3 最容易混淆的記憶法

Precision 看 prediction：模型一旦說「Positive」，我有幾可信？

Recall 看 reality：現實中真正的 Positive，我有幾完整地找出來？

FP 會傷害 Precision；FN 會傷害 Recall。

高 Precision 不代表高 Recall；高 Recall 也不代表高 Precision。

1. PDF 第 1 頁：Evaluation Metrics II - Precision, Recall, F1-Score

PDF 第 1 頁：課程標題頁

1.1 投影片內容

這一頁界定單元主題：在 classification methods 中，接續基本 evaluation metrics，進入 Precision、Recall 與 F1-Score。講者為 Daniel E. Acuna，University of Colorado Boulder。

1.2 影片對這頁的補充

影片一開始就交代「為何需要這一章」：Precision / Recall 是更細緻的 classification performance 衡量方式，尤其在兩種情況更重要：(1) dataset imbalanced；(2) 不同錯誤的成本不同，也就是 cost-sensitive application。這是 PDF 標題頁沒有寫出、但講者口頭先建立的背景。

理解重點Accuracy 把所有正確/錯誤混在一起看；這章則把「錯把負類當正類」與「漏掉真正正類」拆開，因為現實決策往往不會把兩種錯誤當成同樣嚴重。

2. PDF 第 2 頁：Contents of This Video

PDF 第 2 頁：本單元六個學習目標

2.1 六個學習目標逐項解讀

課程項目

實際要理解什麼

Precision / Recall 定義

不只背公式，而是知道分母代表哪一群人：predicted positives 或 actual positives。

何時優先 Precision / Recall

依錯誤成本與資源限制決定，而不是永遠追求同一 metric。

Precision-Recall tradeoff

模型策略更保守通常提高 Precision、降低 Recall；更積極則相反。

F1-score

用 harmonic mean 把 P 與 R 合成單一數字，並懲罰其中一邊太低。

Student intervention metric choice

以獎學金、課程邀請、一般學業規劃為具體場景。

Real-world application

從「metric 分數」連到「真正會識別多少學生、產生多少 false positives」。

2.2 影片的主線

講者明確說明：學生成功預測需要同時處理「找到真正會成功的學生」與「避免 false promises」。因此本單元的核心不是三條獨立公式，而是一個 decision problem：你的目標與錯誤成本不同，最重要的 metric 就不同。

3. PDF 第 3 頁：Precision - Quality of Positive Predictions

PDF 第 3 頁：Precision 的公式、confusion matrix 與 student success 例子

3.1 定義與公式

Precision

Precision = TP / (TP + FP)

問題形式：Of all students we predicted would pass, what fraction actually passed? 也就是「模型說會 Pass 的全部人」之中，真正 Pass 的比例。

投影片把 Precision 稱為「Quality of Positive Predictions」。這個「quality」不是整體 accuracy，而是只檢查正類預測的可靠程度。

3.2 用第 3 頁 confusion matrix 慢慢算

先找模型「Predicted Pass」的整欄：TP=85，加上 FP=10，所以模型一共預測 95 人會 Pass。

其中真正 Pass 的是 TP=85。

所以 Precision = 85 / 95 = 0.8947 = 89.47%。

直覺翻譯模型若對 100 個人說「你會成功」，大約 89 個是真的成功；約 11 個屬於 false positive。這就是「成功預測的可信度」。

3.3 Video 補充：講者實際指了哪些格子？

影片在這頁會把注意力放在 confusion matrix 的「Predicted Pass」部分，並在畫面上標示 TP / FP。這正好對應 Precision 的分母 TP+FP。講者也口誤說了一次 accuracy，隨即更正為 precision，重點仍是 85/95 ≈ 89%。

3.4 為何 scholarship / limited spots 要看 Precision？

投影片列出 advanced course spots、scholarship decisions 與 high cost of false promises。邏輯是：如果資源昂貴或名額少，把機會給錯人（FP）的成本高，所以希望模型一旦說「Positive」，就盡量準。

情境

FP 的實際意思

為何要高 Precision

Scholarship

把獎學金給了最後無法達成要求的人

名額與金錢有限，錯誤承諾成本高

Advanced course

把資源集中到不適合的學生

可能浪費有限教學資源

Selective program

錄取了不符合成功條件的人

每一個 false positive 都佔掉稀缺位置

3.5 常見誤區

Precision 高，只代表「被你挑中的人」很準，不代表你沒有漏掉很多真正成功者。

TN 不進 Precision；因為 Precision 根本不問模型判 Fail 判得如何。

要記分母：TP+FP = predicted positive，不是 actual positive。

4. PDF 第 4 頁：Recall - Coverage of Actual Positives

PDF 第 4 頁：Recall 的公式、coverage 概念與 missed students

4.1 定義與公式

Recall

Recall = TP / (TP + FN)

問題形式：Of all students who actually passed, what fraction did we catch? 也就是「現實中真的 Pass 的全部人」之中，模型成功找出多少。

投影片稱 Recall 為「Coverage of Actual Positives」。Coverage 的意思是覆蓋率/找全率：不是問你挑中的人準不準，而是問真正的正類有多少被你覆蓋。

4.2 用同一 confusion matrix 計算

先找「Actual Pass」的整列：TP=85、FN=15，所以真實 Pass 總數 = 100。

模型成功 catch 到 85 人。

Recall = 85 / 100 = 85%。

最重要的 15 人第 4 頁圖表特別標出「Missed: 15 students」。這 15 人就是 FN：他們其實會成功，但模型沒有把他們辨識為成功者。Recall 專門對這種「漏掉」敏感。

4.3 Video 的「prediction vs. reality」記法

講者用一個很實用的語言區分：Precision 比較像從你的 prediction 出發；Recall 比較像從 reality 出發。雖然這不是正式公式，但非常適合作為記憶法：Precision 問「我說 yes 的人多準？」；Recall 問「現實真正 yes 的人我有沒有抓全？」

4.4 為何 inclusive program 要高 Recall？

投影片列出 inclusive program admission、ensuring no qualified student is overlooked、identifying all potential achievers。這些場景最怕 FN：一個真正有潛力的人如果被漏掉，可能失去機會。因此寧可多邀請一些不一定成功的人（接受較多 FP），也希望少漏人。

4.5 Precision vs Recall 的最短比較

問題

Precision

Recall

分母

TP + FP

TP + FN

視角

模型預測 Positive 的集合

真實 Positive 的集合

最關心的錯誤

FP

FN

student success 問法

我說會 Pass 的人有多準？

真的會 Pass 的人我抓到多少？

5. PDF 第 5 頁：The Precision-Recall Tradeoff

PDF 第 5 頁：Precision-Recall curve 與 Conservative / Balanced / Aggressive 策略

5.1 圖表真正想表達什麼？

左圖 x 軸是 Recall、y 軸是 Precision。曲線上的模型/策略通常不能同時把兩者推到最高：越向左上，代表較保守地只挑很確定的 Positive；越向右下，代表更積極地捕捉更多 Positive，但付出更多 false positives。

影片用 student selection 的「門檻嚴格程度」解釋 tradeoff：若只邀請非常高成就學生，Precision 可很高，但會漏掉不少其實也能成功的人；若非常 inclusive，Recall 會上升，但需要處理更多人、更多資源，而且 false positives 也會增加。

5.2 第 5 頁三種策略的數值

策略

Precision

Recall

Conservative

0.82

0.28

Balanced

0.63

0.59

Aggressive

0.43

0.87

右圖把 tradeoff 變得非常直觀：Conservative 的 Precision 最高但 Recall 最低；Aggressive 剛好相反；Balanced 讓兩者相對接近。

5.3 為什麼調整 threshold 會形成 tradeoff？

概念解釋（非投影片新增公式）把模型想成有一個「判 Positive 的門檻」。門檻高：只有非常確定才判 Positive，通常 FP 少 → Precision 上升，但 FN 多 → Recall 下降。門檻低：更多人被判 Positive，FN 少 → Recall 上升，但 FP 也可能變多 → Precision 下降。

依頁 5 圖表推算

P

R

F1

Conservative

0.82

0.28

0.417

Balanced

0.63

0.59

0.609

Aggressive

0.43

0.87

0.576

這個推算不是第 5 頁直接列出的 F1，而是使用第 6 頁提供的 F1 公式對第 5 頁的 P/R 值計算。結果顯示 Balanced 策略的 F1 約 0.609，高於另外兩個極端策略，正好預告下一頁「F1 用來找平衡」的角色。

6. PDF 第 6 頁：F1-Score - Balancing Precision and Recall

PDF 第 6 頁：F1 harmonic mean 與三種策略比較

6.1 公式

F1-Score

F1 = 2 x (Precision x Recall) / (Precision + Recall)

投影片把 F1 稱為 Precision 與 Recall 的 harmonic mean（調和平均）。數值在 0 到 1 之間，並且會更靠近較低的那一邊。

6.2 為什麼不用普通平均？

影片強調：F1 會「重罰其中一邊非常低」的模型。例如 Precision 很高但 Recall 很低時，F1 不會被高 Precision 輕易拉高，而會更接近低 Recall。這就是 harmonic mean 的實務價值：它不允許模型靠單邊漂亮分數掩蓋另一邊的弱點。

用課件例子看得最清楚Conservative：P=0.85、R=0.50 → F1≈0.63。雖然 Precision 很漂亮，但 Recall 只有 0.50，所以 F1 被拉回 0.63。Balanced：P=0.70、R=0.70 → F1=0.70。兩者一致時，F1 就等於它們。Aggressive：P=0.45、R=0.90 → F1=0.60。Recall 很高仍無法抵消 Precision 太低。

6.3 用第 3-4 頁同一 confusion matrix 算 F1

同一 student matrix 的 F1

F1 = 2 x (0.8947 x 0.8500) / (0.8947 + 0.8500) = 0.8718 ≈ 87.18%

因此那個 matrix 的 P=89.47%、R=85.00%、F1≈87.18%。F1 介乎兩者之間，而且更接近較低的 Recall。

6.4 何時適合 F1？

投影片寫「balances both metrics equally」以及「single number for model comparison」。也就是當你同樣關心 FP 與 FN，而且希望用一個數字比較模型時，F1 是很自然的選擇。但它不是永遠最佳：若 business cost 明確偏向某一種錯誤，仍應優先看 Precision 或 Recall。

7. PDF 第 7 頁：Choosing Metrics for Student Interventions

PDF 第 7 頁：依 opportunity cost / stakes 選 Precision、Recall 或 F1

7.1 這頁把「數學 metric」轉成「決策 metric」

前幾頁是在定義 metric；第 7 頁開始真正回答「我應該用哪一個？」投影片用 opportunity allocation 作框架：資源越昂貴/名額越有限，就越怕 FP；機會越便宜/越容易廣泛提供，就越可以容忍 FP，而更怕漏掉 FN。

Opportunity 類型

建議 metric

課件例子

High-stakes / Expensive / Selective

Prioritize Precision

Advanced program admission、scholarships

Broad / Widely available / Cheap

Prioritize Recall

Study abroad info、honors course invitations

General / Moderate / Balanced

Use F1-Score

General academic planning、course recommendation

7.2 一個通用選擇框架

先定義 Positive class 是什麼。

問：FP 的代價大不大？如果大，優先 Precision。

再問：FN 的代價大不大？如果大，優先 Recall。

如果兩種錯誤都同樣重要，而且需要單一分數比較模型，使用 F1。

非常重要Metric 不是由模型類型決定，而是由任務目標和錯誤成本決定。同一個 classifier，在不同業務情境下，可能要用不同 metric 來評估。

7.3 右側 scatter plot 的閱讀方式

右圖用 Cost/Resources Required 與 Stakes/Intensity 表示不同機會，例如 Course Invitations、Study Groups、Scholarships、Graduate School Prep、Honors Program。圖上另外標出 High Recall、Balanced (F1-Score)、High Precision 等區域，目的是把「資源/風險」與 metric 偏好連在一起，而不是把某一個固定數值當成 universal threshold。

8. PDF 第 8 頁：Real-World Application Example

PDF 第 8 頁：Conservative vs Aggressive model 的 metric 與 opportunity allocation impact

8.1 左圖：兩個模型的分數其實很接近 F1，但行為很不同

Model

Precision / Recall / F1

決策風格

Conservative

0.80 / 0.70 / 0.75

較少 false positive，較重視選中的人是否真的成功

Aggressive

0.65 / 0.85 / 0.74

抓到更多 actual positives，但接受更多 false positives

最值得留意的是 F1：0.75 vs 0.74，幾乎一樣。如果你只看 F1，會覺得兩個模型差不多；但 P/R 組合顯示它們的 operational behavior 完全不同。這正是為什麼「single-number metric」方便，但不能完全取代對 Precision、Recall 的理解。

8.2 右圖：metric 會變成實際人數與資源成本

Model

Successful students identified

False positives

Conservative

448

112

Aggressive

680

366

Aggressive model 多識別 232 名 successful students（680-448），但同時多帶來 254 個 false positives（366-112）。這就是 tradeoff 的「人數版本」：不是抽象的 0.65 / 0.85，而是「你願意多處理多少錯誤候選，來換取多找到多少真正成功者」。

8.3 數值一致性提示：把這頁當作概念性案例

來源數值的限制如果把右圖 absolute counts 與左圖 Recall 當作「同一個固定測試集」來反推 actual positives：Conservative 會得到 448/0.70=640，而 Aggressive 會得到 680/0.85=800，兩者不一致。因此這一頁更合理的讀法是「概念性 impact comparison」，不要據此還原一個共用的完整 confusion matrix。這是對投影片數字的交叉檢查，不是要改寫課件結論。

8.4 實務選擇題

如果 scholarship 名額非常少，Conservative model 的 0.80 Precision 可能更合適；如果只是寄出低成本的 information / invitation，希望不要漏掉潛力學生，Aggressive model 的 0.85 Recall 可能更有價值。F1 幾乎相同，卻不能替你決定 business objective。

9. PDF 第 9 頁：What We’ve Covered

PDF 第 9 頁：全章總結

9.1 六個結論對應整章脈絡

課件總結

你應該真正記住的意思

Precision

正類預測的 quality；控制 false positives。

Recall

actual positives 的 coverage；控制 false negatives。

Tradeoff

保守與積極策略通常讓 P/R 此消彼長。

F1

在 P/R 都重要時，以 harmonic mean 做 balanced single score。

Metric selection

要根據 opportunity allocation / error cost，而不是只追最高數字。

Real-world considerations

同一個 F1 附近的模型，實際資源消耗與漏人/錯人模式可以很不一樣。

影片最後再次強調：未來換成其他 classification problem，仍然用同一種思考方式——先看你最不能接受的是 FP 還是 FN，再決定 Precision、Recall 或 F1。

10. 整章概念鏈：從 Confusion Matrix 到 Metric 選擇

完整脈絡Confusion Matrix → 先定 Positive class → 分清 TP / FP / FN / TN → Precision 看 TP/(TP+FP) → Recall 看 TP/(TP+FN) → 調整模型/門檻形成 Precision-Recall tradeoff → 需要平衡時算 F1 → 最後根據實際錯誤成本選 metric。

10.1 Decision Tree：考題見到情境應如何判斷？

題目是否強調「false positive 很貴 / 資源有限 / 不能亂承諾」？是 → Precision。

否則，是否強調「不能漏掉真正 positive / 要盡量全部抓出」？是 → Recall。

如果 FP 與 FN 都同樣重要，或題目說需要 balanced single metric → F1。

如果題目只問整體正確率，而且 class balance 與 error cost 沒有問題，才回到 Accuracy；但這不是本章重點。

10.2 「分母」是最快解題法

Metric

分母先問什麼？

公式

Precision

模型一共預測了多少 Positive？

TP + FP

Recall

現實中一共有多少 Positive？

TP + FN

F1

不直接看 confusion matrix 分母；先取得 P 與 R

2PR/(P+R)

10.3 同一個 confusion matrix 的完整 worked example

使用課件矩陣 TP=85, FP=10, FN=15, TN=90：

Predicted Positive = TP+FP = 95。

Actual Positive = TP+FN = 100。

Precision = 85/95 = 89.47%。

Recall = 85/100 = 85.00%。

F1 = 87.18%。

（延伸推算）Accuracy = (85+90)/200 = 87.50%。這個數字雖然不差，但它不直接告訴你 FP=10 與 FN=15 哪一種錯誤更重要，正好說明本章為何需要 P/R/F1。

11. Precision / Recall / F1 超精簡對照表

你要問的問題

Metric

關鍵詞

我判 Positive 的人有幾準？

Precision

quality, false alarm, FP, scarce resources

所有真正 Positive 我抓到幾多？

Recall

coverage, missed cases, FN, inclusive

我想兩者平衡，用一個分數比較？

F1

harmonic mean, balance, single score

11.1 公式速查

Precision

TP / (TP + FP)

FP 越多，Precision 越低。

Recall

TP / (TP + FN)

FN 越多，Recall 越低。

F1

2PR / (P + R)

P 或 R 任一邊很低，F1 都會明顯下降。

11.2 常見 MCQ 關鍵字

題目用語

對應思路

Scholarship / selective / limited spots

通常偏 Precision，因為 false positive 成本高。

Screening / inclusive / do not miss

通常偏 Recall，因為 false negative 成本高。

Balanced / both errors matter

F1。

Imbalanced data / cost-sensitive

不要只看 Accuracy；檢查 P/R/F1 與 class/error cost。

Conservative threshold

通常 P↑、R↓。

Aggressive threshold

通常 R↑、P↓。

11.3 30 秒記憶版

P-R-F1 三句口訣Precision：我「預測」的 Positive，有幾多是真的？Recall：現實真正 Positive，我「追回」了幾多？F1：P 和 R 拉扯時，給我一個平衡分。

12. PDF / TXT / Video 交叉整理結論

三份來源的核心內容一致：PDF 提供 9 頁結構化投影片；TXT 是影片講稿；Video 使用同一套 slides，並在 Precision / Recall 的 confusion matrix 上以視覺標示 TP、FP 等區域，補強「分母到底看哪一群」的理解。

12.1 TXT / Video 比 PDF 多出的口頭重點

開場明確指出：P/R 對 imbalanced dataset 與 cost-sensitive application 特別重要。

Precision 可用「prediction」視角記；Recall 可用「reality」視角記。

高 Precision 可透過更 stringent / conservative criteria 取得，但可能漏人。

高 Recall 可透過更 inclusive / aggressive strategy 取得，但需要更多 effort/resources，且會增加 false positives。

F1 是 harmonic mean，會靠近較低的一邊，不能讓單邊高分掩蓋另一邊低分。

Metric choice 應配合 opportunity allocation strategy，而不是只追一個 universal best metric。

12.2 本章學完應達到的能力

看到 confusion matrix，能立即找出 TP/FP/FN/TN。

不用死背，也能從「predicted positives」推回 Precision 分母。

不用死背，也能從「actual positives」推回 Recall 分母。

看見「不能亂承諾」知道要 Precision；看見「不能漏掉」知道要 Recall。

能解釋 P-R tradeoff，不誤以為兩者一定同步上升。

能用 F1 比較 balanced performance，同時知道 F1 不能取代業務成本分析。

Final takeaway本章真正要學的不是三個數字，而是「錯誤的代價」。Precision、Recall、F1 都只是把不同錯誤偏好量化。先問你最怕 FP 還是 FN，metric 自然就會選對。

## Connections

[[Supervised Learning MOC]] · [[Supervised Learning - Module 3 MOC]] · [[Evaluation Metrics_Confusion Matrix, Accuracy, Error Rate]] · [[Evaluation Metrics_ROC Curves, AUC]]

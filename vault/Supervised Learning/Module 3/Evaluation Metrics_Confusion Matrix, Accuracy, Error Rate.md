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

# Evaluation Metrics_Confusion Matrix, Accuracy, Error Rate

> [!info] Learning position
> Supervised Learning → Module 3 → Topic 4

## Evaluation_Metrics_I_Confusion_Matrix_Accuracy_Error_Rate_Detailed_Analysis

Evaluation Metrics I

Confusion Matrix, Accuracy, Error Rate

PDF 逐頁詳細分析 + TXT 講稿 + Video 交叉整理

Classification Methods - University of Colorado Boulder

Lecturer: Daniel E. Acuna | Video length: 約 13 分 33 秒

本筆記的整理原則以 PDF 的視覺矩陣、公式與數字作為主要結構；用 TXT/video 補足教授的口頭解釋與 PDF 動畫未完整顯示的內容。若講稿口述與投影片出現矛盾，本文件會明確標記，而不是默默改寫。

A. 單元核心 Overview

先理解「為什麼 classification evaluation 比 regression 麻煩」，再看各頁細節。

Regression 可以直接量度預測值與真實值之間的數值距離，例如 MSE、RMSE；但 classification 的類別本身沒有自然的「距離」。把 chair 分成 table，並不存在像「差 3.7」這種連續誤差。因此分類模型不能只問「錯多少」，而要問「錯的是哪一種」。這正是 confusion matrix 的作用：把正確與錯誤預測拆成 TP、TN、FP、FN。

整個單元的邏輯可濃縮成：先用 confusion matrix 看清四種結果，再計算 accuracy/error rate；接著檢查 class imbalance，因為高 accuracy 可能只是模型一直猜多數類別；最後把 FP 與 FN 的實際成本、baseline 以及業務目標納入，決定是否還要看 precision、recall 等其他指標。

本章學習流程（7 步）

在 validation/test data 上取得分類預測。

把預測整理成 confusion matrix：TP / TN / FP / FN。

計算 Accuracy 與 Error Rate，先掌握整體正確率。

檢查 class balance：某一類是否遠多於另一類？

比較 FP 與 FN 的實際成本：哪一種錯誤更嚴重？

拿模型跟 baseline 比：random、majority class、prior information、simple rule。

依任務選指標：balanced + 同等錯誤成本可用 accuracy；imbalanced 或成本不對稱時不要只看 accuracy。

一句話記憶Accuracy 只告訴你「總共答對幾多」，Confusion Matrix 告訴你「到底答錯咗邊一種」。

B. 來源一致性與口述差異

這部分很重要：TXT 是口語轉錄，當中有幾處與投影片本身不一致。

本文件在術語與數值上，以 PDF/video 畫面中的 matrix 與公式為準，TXT 用來補充教授的意圖、例子與原因。以下是幾個需要特別留意的地方：

差異

整理方式

FP / FN 的口述

PDF 第 3、7 頁清楚定義：若 Positive = Pass，FP = predicted Pass / actual Fail；FN = predicted Fail / actual Pass。TXT 前段曾把 false negative 說成 predicted pass but actually failed，與投影片矛盾。

Type I / Type II 的口述

投影片第 7 頁顯示 False Positive = Type I、False Negative = Type II；TXT 有一句把兩者反過來。本文採投影片定義。

Error rate 數字

投影片計算是 (10+15)/200 = 12.5%；TXT 口述曾說約 12.3%。按公式與投影片數字應為 12.5%。

Imbalanced 範例數字

右側 matrix 是 170、10、5、15；actual fail 共 20，其中 5 人被錯判為 pass，因此 miss 25% of failing students。TXT 某處出現「50 students correctly predicted as failing」的口述/轉錄，但畫面是 15。

PDF 第 9 頁

PDF 匯出版本只留下標題 Choosing the Right Metric；video 約 12:15 起實際顯示完整 bullet points。本文把 video 畫面的缺失內容補回。

1. PDF Page 1 - Evaluation Metrics I

主題：Confusion Matrix、Accuracy、Error Rate。

來源：PDF p.1；Video 開場。

這一頁在建立什麼問題？

這是分類模型評估（classification evaluation）的第一個單元。教授先對比 regression：回歸有連續數值，因此可以用 MSE/RMSE/R² 等直接衡量「預測距離真實值多遠」；分類的 label 是離散類別，類別之間通常沒有可直接相減的距離，所以評估會更依賴「錯誤類型」。

你要帶走的核心

Confusion Matrix 是分類評估的基礎表格。

Accuracy / Error Rate 是從 matrix 壓縮出來的總體指標，但不是完整答案。

真正的難點不是算公式，而是理解不同錯誤在真實情境中的代價。

2. PDF Page 2 - Contents of This Video

整個章節不是只教公式，而是教「如何判斷 accuracy 何時可信」。

來源：PDF p.2；TXT/video 開場。

六個學習目標

理解 confusion matrix

計算 accuracy 與 error rate

理解 accuracy 何時會誤導

處理 class imbalance 的評估問題

解讀不同錯誤類型

按 student success 的目標選合適 metric

這個順序很有意思：先學最簡單的 accuracy，然後馬上學它的限制。換句話說，本章不是要你「永遠用 accuracy」，而是要你知道它只在某些資料條件下才合理。

3. PDF Page 3 - The Confusion Matrix

四格表是整個單元最重要的結構。

來源：PDF p.3；TXT/video 約 2-4 分鐘。

先固定矩陣方向

投影片採用：row = Actual（真實），column = Predicted（模型預測）；而 Positive 被定義為 Pass。只要先固定這兩件事，TP/TN/FP/FN 就不需要死背。

Actual \ Predicted

Pass

Fail

Pass

TP = 85

FN = 15

Fail

FP = 10

TN = 90

四格逐一解釋

格子

Student success 解讀

TP = True Positive = 85

實際 Pass，模型也預測 Pass。正確識別成功學生。

FN = False Negative = 15

實際 Pass，但模型預測 Fail。學校可能誤以為學生有風險，安排不必要 intervention。

FP = False Positive = 10

實際 Fail，但模型預測 Pass。這是「漏掉真正需要幫助的人」。

TN = True Negative = 90

實際 Fail，模型也預測 Fail。正確識別 at-risk student，可及早介入。

最容易混淆的地方「False」不是指 actual class 是 false，而是指模型這次判斷錯了；Positive / Negative 則取決於你把哪一類定為 positive。此投影片把 Pass 當 Positive。

4. PDF Page 4 - Calculating Basic Metrics

把四格壓縮成一個整體正確率。

來源：PDF p.4；TXT/video 約 4-5 分鐘。

Accuracy = (TP + TN) / (TP + TN + FP + FN)

Error Rate = (FP + FN) / (TP + TN + FP + FN)

Error Rate = 1 - Accuracy

用投影片 200 位學生計算

總人數 = 85 + 90 + 10 + 15 = 200。正確預測 = TP + TN = 85 + 90 = 175，因此 Accuracy = 175/200 = 87.5%。錯誤預測 = FP + FN = 10 + 15 = 25，因此 Error Rate = 25/200 = 12.5%。

直覺Accuracy =「答對幾多題 / 全部幾多題」；Error Rate =「答錯幾多題 / 全部幾多題」。兩者互補，所以加起來等於 100%。

限制

87.5% 看起來很好，但這個數字把 FP 和 FN 混在一起，也沒有告訴你兩個 class 是否平衡。因此它回答「整體有幾準」，卻沒有回答「哪一群人被模型忽略」。這直接引出下一頁。

5. PDF Page 5 - When Accuracy Can Be Misleading

同樣或更高的 accuracy，不代表少數類別被照顧得更好。

來源：PDF p.5；TXT/video 約 5-7 分鐘。

左邊：Balanced Classes

左側仍是 TP=85、FN=15、FP=10、TN=90，兩個 actual class 各約 100 人。Accuracy = 87.5%。因為 Pass/Fail 人數接近，整體 accuracy 比較能反映兩邊的表現。

右邊：Imbalanced Classes（90% pass rate）

右側 matrix 是 TP=170、FN=10、FP=5、TN=15，共 200 人；其中 actual Pass=180、actual Fail=20。Accuracy = (170+15)/200 = 92.5%，比左邊更高。

但如果你的真正任務是「找出會 fail 的學生」，右邊有 20 位 failing students，模型漏掉 5 位（predict Pass），也就是漏掉 25%。換言之，總體 accuracy 變高，不代表 at-risk group 的識別一定更好。

本頁最重要的陷阱Imbalanced dataset 會令 majority class 主宰 accuracy。當 90% 都是 Pass，模型只要很擅長預測 Pass，就可能得到漂亮分數，即使它對 Fail class 的表現很差。

由投影片數字可額外推導

右側 failing students 的「被抓到比例」是 15/20 = 75%，漏掉比例是 5/20 = 25%。本頁尚未正式命名這個 metric，但下一系列通常會用 recall/sensitivity 等指標來描述這種「某一類被抓到多少」的問題。

6. PDF Page 6 - The Class Imbalance Problem

為什麼「永遠猜 Pass」都可能有 90%-95% accuracy？

來源：PDF p.6；TXT/video 約 7-8 分鐘。

Naive baseline 的反例

假設 90% 學生會 Pass。如果建立一個完全不看任何 feature 的模型，永遠輸出 Pass，它的 accuracy 已經是 90%。如果 95% 會 Pass，這個「笨模型」甚至有 95% accuracy。

但它對 failing students 的識別能力是 0：所有真正 Fail 都被預測為 Pass，也就是 miss 100% of failing students。這就是「高 accuracy 可以隱藏 minority class 的差表現」。

投影片給的實際類型

Dropout prediction：dropout rate 約 5%

Academic probation：約 10% students

Advanced course failure：約 15% fail rate

這些都是典型的 rare-event / minority-class 問題。教育機構通常最在意的正是少數的「有風險學生」，因此只用 accuracy 會與實際目的錯位。

判斷準則模型是否好，不是問「Accuracy 高不高」，而是問「它有沒有比最簡單的 majority-class baseline 做得更好，而且有沒有抓到你真正關心的 minority class」。

7. PDF Page 7 - Understanding Different Error Types

錯誤不是一樣貴：FP 與 FN 要看情境成本。

來源：PDF p.7；TXT/video 約 8-10 分鐘。

False Negative（Type II Error）

在本投影片定義（Positive=Pass）下：Predicted Fail、Actual Pass。模型以為學生會 fail，因此學校可能安排 tutoring、counselling 或額外介入，但學生其實本來就會 pass。主要成本是資源浪費、打擾與可能的 stigma。

False Positive（Type I Error）

Predicted Pass、Actual Fail。模型以為學生沒問題，但學生最後 fail，於是失去及早 intervention 的機會。教授強調，在 student-success 情境中，這種錯誤往往比不必要介入更嚴重，因為可能涉及退課、延遲畢業、甚至 dropout 等後果。

為什麼這會影響 metric？

如果 FP 的成本遠高於 FN，你就不應只最大化 accuracy，因為 accuracy 把兩種錯誤視為同一個「錯一個」。真實系統應該把「哪種錯誤不能接受」納入目標，並選擇對應指標或 decision threshold。

來源差異提醒TXT 有一句把 Type I / Type II 對應反過來；PDF/video 畫面則顯示 Type I = False Positive、Type II = False Negative。本文依投影片。

8. PDF Page 8 - Baseline Comparisons

你的模型不是跟「0」比，而是跟合理的簡單方法比。

來源：PDF p.8；TXT/video 約 10-12 分鐘。

四種 baseline

1. Random Guessing: Balanced classes 下隨機 Pass/Fail，約 50% accuracy。

2. Majority Class: 永遠猜最常見的 outcome；imbalanced 時可以得到很高 accuracy。

3. Prior Information: 利用過往 semester pass rate 或學生歷史表現。

4. Simple Rule: 例如 GPA > 3.0 => Pass。

投影片示意圖中：Random Guessing 50%、Majority Class 50%、GPA Rule 75%、Our Model 87.5%。因此真正值得說的是「model 比一個簡單 GPA rule 多約 12.5 percentage points」，而不是只說模型有 87.5%。

Baseline 的三個作用

建立最低可接受 performance expectation

提供 context，避免被表面上的高 accuracy 欺騙

判斷複雜模型是否真的提供額外價值

機器學習實務如果 sophisticated model 連 random / majority / simple rule 都贏不了，就算用了很複雜的 algorithm，也不代表有實際價值。

9. PDF Page 9 - Choosing the Right Metric

PDF 只顯示標題；完整內容需由 video 畫面補回。

來源：PDF p.9（只有標題）。以下內容由 video 約 12:15 的投影片補回。

Video frame：Choosing the Right Metric（約 12:15）。

When to Use Accuracy

Balanced classes（roughly 50-50 split）

Equal cost for all error types

General model comparison

When NOT to Use Accuracy

Imbalanced classes

Asymmetric error costs

Focus on minority class（例如 at-risk students）

投影片提出的替代方向

Weight classes during training

Use different evaluation metrics（precision, recall）

Focus on specific performance goals

所以「選 metric」其實不是數學公式選擇題，而是資料分布 + error cost + 任務目標的共同決策。balanced、兩類錯誤成本相若時 accuracy 很直觀；一旦 class imbalance 或錯誤成本不對稱，就要把觀察焦點轉到特定 class 與特定 error。

決策口訣Balanced + similar costs -> Accuracy 可以；其他情況 -> 不要只依賴 Accuracy。

10. PDF Page 10 - What We've Covered

把本章濃縮成一個可重複使用的 classification evaluation workflow。

來源：PDF p.10；Video 結尾。

理解 confusion matrix 及 TP/TN/FP/FN。

從 matrix 計算 accuracy 與 error rate。

知道 imbalanced classes 會令 accuracy 產生假象。

比較不同 error types 及其 relative costs。

用 baseline 判斷複雜模型是否真正增值。

知道何時可以用 accuracy，以及何時要用其他 metrics。

C. 整合例子：從 Confusion Matrix 到決策

把本章所有概念串成一次完整分析。

假設你有 200 位學生，matrix 為 TP=170、FN=10、FP=5、TN=15。首先整體 Accuracy = 185/200 = 92.5%，看起來很高。

Actual \ Predicted

Pass

Fail

Pass

TP = 170

FN = 10

Fail

FP = 5

TN = 15

第二步看 class distribution：actual Pass=180（90%），actual Fail=20（10%），因此資料明顯 imbalanced。這時 92.5% accuracy 不足以證明模型對 Fail class 很好。

第三步看最重要的錯誤：5 位 actual Fail 被預測 Pass。對 20 位 failing students 來說，這是 25% 被漏掉。若學校的目標是及早幫助有風險學生，這 5 個錯誤可能比「10 位本來會 Pass 卻被誤判 Fail」更昂貴。

第四步跟 baseline 比：若永遠猜 Pass，accuracy 已經有 90%。所以你的模型 92.5% 只比這個 naive baseline 高 2.5 percentage points。接下來不能只說「92.5% 很高」，而要問它在 at-risk group 上的表現與 intervention 成本是否值得。

完整判斷Accuracy 是起點，不是終點。先看總體 -> 再看 imbalance -> 再看 FP/FN cost -> 再看 baseline -> 最後才決定 metric 與模型是否可用。

D. 考試 / 作業 Quick Sheet

最少要記住的公式、方向與陷阱。

1. Confusion Matrix

Actual \ Predicted

Pass

Fail

Pass

TP

FN

Fail

FP

TN

2. 公式

Accuracy = (TP + TN) / Total

Error Rate = (FP + FN) / Total

Error Rate = 1 - Accuracy

3. Accuracy 何時可信？

Classes roughly balanced。

FP / FN 成本相近。

只需要一般性的 overall comparison。

4. Accuracy 何時危險？

Class imbalance 很嚴重。

Minority class 才是你真正關心的對象。

FP 與 FN 的真實成本差很多。

Majority-class baseline 已經能拿到很高 accuracy。

5. Baseline 最少要懂

Random guess -> Majority class -> Prior information -> Simple rule -> Your model。模型應該證明自己比這些簡單方法有額外價值。

E. 最淺白的總結

如果你只想記住這一章的「故事線」。

你做 classification，好像叫 AI 判斷學生「Pass / Fail」。Accuracy 只是問：200 個學生中，你猜中幾多個？但如果 190 個本來就會 Pass，你每次都猜 Pass，Accuracy 已經 95%。這個模型看似超強，其實完全找不到那 10 個真正會 Fail 的學生。

所以要用 confusion matrix 把錯誤拆開：到底是「把會 Pass 的人誤當 Fail」，還是「把會 Fail 的人誤當 Pass」？在學校場景，後者可能更嚴重，因為你錯過了幫助學生的機會。最後，還要跟最簡單 baseline 比，否則一個 90% 的模型可能只是在利用 90% 的人都屬於同一類。

本章一句話Classification evaluation 的真正目的，不是追求最高的一個百分比，而是確認模型在你最在意的 class、最在意的錯誤，以及真實成本下，是否真的做得更好。

F. Source Notes

本文件只根據使用者提供的 PDF、TXT 與 MP4 整理，沒有引入網路資料。

PDF 共 10 頁。Video 約 812.97 秒（13:33）。TXT 為影片口語內容的文字版本。由於口語轉錄含少量術語/數字不一致，本文件已在「來源一致性與口述差異」章節逐項標記。

## Connections

[[Supervised Learning MOC]] · [[Supervised Learning - Module 3 MOC]] · [[Domain-Specific Applications of Evaluation Metrics]] · [[Evaluation Metrics_Precision, Recall, F1-Score]]

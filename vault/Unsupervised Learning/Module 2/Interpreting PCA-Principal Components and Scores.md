---
course: Unsupervised Learning
module: 2
status: curated
tags:
  - unsupervised
  - module-2
  - dimensionality-reduction
  - pca
publish: true
---

# Interpreting PCA-Principal Components and Scores

> [!info] Learning position
> Unsupervised Learning → Module 2 → Topic 3

## 05_Review_QA_Active_Recall

# Interpreting PCA — 複習與測試

## 20 條 Concept Q&A

### Q01：Loading 與 score 最大分別？

Loading 是一條主軸的特徵權重；score 是某個樣本套入權重後的座標。

### Q02：為甚麼 178 個樣本降到兩維，仍有 178 個點？

降維減少每個樣本的特徵座標數，不是減少樣本數。

### Q03：Top 6 loadings 代表只用六個特徵嗎？

不是。它只是圖形選擇展示六個係數；此例原始輸入有 13 個特徵。

### Q04：Loading = 0.42 代表解釋 42% 變異嗎？

不是。0.42 是線性組合係數；解釋變異比例是另一個量。

### Q05：為甚麼要先注意前處理？

不同量尺會影響 PCA 所看到的變異，以及係數大小的可比性。

### Q06：負 loading 是壞特徵嗎？

不是。它代表相對於該 PC 正向的反向權重。

### Q07：兩個 loading 一正一負，可以直接說有因果關係嗎？

不可以。它們只表示該主成分中的相對方向，不提供因果識別。

### Q08：hue 在 PC1 正、PC2 負是否矛盾？

不矛盾。同一原始特徵可以參與兩條不同的線性組合。

### Q09：PC1 與 PC2 正交，是否不能共用特徵？

不是。正交是整組 loading 向量內積為零，不要求每個特徵只出現一次。

### Q10：Scores plot 的一個點是特徵還是酒？

是一瓶酒，也就是一個 observation。

### Q11：Biplot 的一支箭嘴是酒還是特徵？

是一個原始特徵，兩個分量是它在 PC1、PC2 的 loadings。

### Q12：Scores 圖有三種顏色，是否 PCA 做了三群 clustering？

不是。顏色只是圖例中的既有类别；PCA 本身輸出線性座標，不自動產生這三個群標籤。

### Q13：PC1 36.2%、PC2 19.2%，兩者保留多少？

約 55.4% 的變異，而不是 55.4% accuracy。

### Q14：二維靠近，原始 13 維一定靠近嗎？

不一定，其他被省略方向可能仍有很大差異。

### Q15：點與箭嘴垂直，是否實際特徵值一定恰好等於平均？

不一定。兩個 PC 的重建分量為零，但被省略成分可能仍有貢獻。

### Q16：內積一定等於投影長度嗎？

只有向量長度為 1 等適當條件下才可如此說；一般還要乘上被投影方向向量的長度。

### Q17：為甚麼不能直接拿螢幕上的箭嘴長度重建原始值？

圖可能放大或重新縮放箭嘴，而且原值可能先中心化或標準化。

### Q18：只把一個 loading 改負號，還是同一個 PC 嗎？

通常不是。符號任意性指整個主成分的 loading 向量和對應 scores 同時翻轉。

### Q19：為甚麼符號翻轉不改重建？

每一項 score×loading 同時出現兩個負號，乘積不變。

### Q20：「高 PC1 的酒比較健康」可以由本課圖表證明嗎？

不可以。這是領域結論，需要健康相關資料與另外的證據，PCA 圖只顯示共同變化模式。

## Active Recall — 以下 8 題不附答案

1. 【定義】用自己的話解釋 loading、score、principal component 的差別。
2. 【維度】有 178 個樣本、13 個特徵、保留 2 個 PC 時，X、V、Z 分別多大？
3. 【公式】逐一解釋 z_ik = Σ_j v_jk x_ij 的所有符號，並說明為甚麼要跨特徵加總。
4. 【手算】樣本中心化座標為 (4,−3)，PC1 權重 (0.6,0.8)，PC2 權重 (−0.8,0.6)。算兩個 scores。
5. 【讀圖】hue 的兩個 loadings 約為 (0.30,−0.28)，樣本位置 (2,2)。hue 的兩維近似重建值偏高、偏低，還是接近平均？請手算。
6. 【機制】為甚麼把同一 PC 的 scores 和 loadings 一起乘 −1 不改重建？只改 loading 會怎樣？
7. 【陷阱】PC1、PC2 的圖中兩瓶酒非常靠近，是否可以宣布兩瓶酒的 13 項化學測量都差不多？
8. 【綜合】PC1 被命名為 Phenolic & Color Profile。請寫一個圖表支持的結論，再寫一個看似合理、但圖表並不支持的結論。

## 最後 6 段整合總結

本課的目的，是把 PCA 找出的數學方向轉成可以討論的資料模式。PCA 不只是把 13 個座標變成兩個座標；我們還要知道新座標由甚麼組成、每個樣本位於何處，以及圖中結構有甚麼限制。

Loadings 是原始特徵在主成分上的權重。讀它們時先看絕對大小，再看同一條軸內的相對正負。符號不等於好壞，較大的係數也不等於較高的解釋變異百分比。

Scores 是每一個樣本把自己的特徵值放進 loading 配方後得到的新座標。Scores plot 畫的是樣本，不是特徵；圖中三種 class 配色亦不是 PCA 自動輸出的 clustering 結果。

Biplot 同时畫出 scores 點與 loading 箭嘴。樣本位置與特徵箭嘴的內積，對應以所保留主成分作出的近似重建。解讀高低時，要相對於前處理後的零點，並注意被丟棄的成分及繪圖縮放。

一條主軸的正方向可以反過來。對同一個 PC 同時翻轉全部 loadings 與 scores，會讓圖形鏡像，但不改變距離、變異或重建；因此重點是相對模式，而非哪個軟件把哪一邊標成正。

最後，PCA 能提供共同變化與變異方向，不能自動賦予品質、健康、商業價值或因果解釋。命名主成分是幫助理解的假說；應看多個 PC、對照領域知識，並容許不確定與不同解釋。

## 15 句必記精華

1. Loading 是主軸的權重，score 是樣本在主軸上的座標。
2. n 或 N 數樣本，p 或 P 數原始特徵，K 數保留主成分。
3. 本課 178×13 的輸入，用兩個主成分表示後為 178×2。
4. 一個 PC 是所有原始特徵的加權和，不是選出一個「最重要原始欄位」。
5. Top 6 loading 圖不是完整的 13 特徵公式。
6. Loading 的絕對值與正負方向都要看，但正負不代表好壞。
7. 0.42 的 loading 不等於 42% 的變異。
8. 同一特徵可以在 PC1 正向、在 PC2 負向。
9. Scores plot 一點一個樣本；biplot 一箭嘴一個原始特徵。
10. Wine 圖中 PC1 與 PC2 合計保留約 55.4% 變異。
11. 二維接近不能排除未顯示方向上的差異。
12. Biplot 中「同向偏高、反向偏低」是近似重建、相對平均的解釋。
13. 內積一般等於帶正負的投影長度乘上箭嘴向量長度。
14. 同一 PC 的 scores 與 loadings 一起翻號，重建與結構不變。
15. PCA 的解釋性命名需要領域驗證，不是數學自動證明的標籤。

## 我真的懂了嗎？Checklist

- [ ] ⭐ 我能分開解釋 loading 與 score。
- [ ] ⭐ 我能說清 n、p、K、i、j、k。
- [ ] 我知道 PDF 第 3 頁與第 8 頁的 i 用法不同。
- [ ] 我能手算一個 score。
- [ ] 我能由兩個 scores 和兩個 loadings 重建一個特徵值。
- [ ] ⭐ 我知道為甚麼內積不一定等於投影長度。
- [ ] 我知道圖上零點何時對應原始特徵平均。
- [ ] 我知道 55.4% 不是 accuracy。
- [ ] 我能讀懂兩張 loading bar charts 的每個元素。
- [ ] 我能解釋 biplot 的全部五支箭嘴。
- [ ] 我能證明同一 PC 一起翻號不改重建。
- [ ] 我能指出圖表不支持的因果或品質結論。

**來源：**本複習主要依附上的 Interpreting PCA-Principal Components and Scores.pdf 與 TXT。數字學生例子、投影長度澄清及矩陣整理屬教學推導，不是 Wine 原始資料或老師的額外口頭說明。

## README

# Interpreting PCA — 圖表、截圖與獨立文字複習卡

本包配合對話中的逐頁深入分析。卡片是 12 個各自獨立的 Markdown 文字檔，不是圖片卡。

## 內容

- 01_PDF_Pages：PDF 全部 13 頁的清晰轉圖。
- 02_Charts：5 張拆開的原課件圖表（PC1、PC2 loading bars、scores、biplot、sign ambiguity）。它們是原圖擷取，沒有重畫或改變資料。
- 03_Video_Screenshots：6 張按內容選取、附時間對照的影片截圖。來源影片只有 428×240，未冒充原生高清。
- 04_Independent_Study_Cards：12 張獨立 MD 文字學習卡。
- 05_Review_QA_Active_Recall.md：20 個問答、8 個不附答案的回想問題、6 段總結、15 句重點及 checklist。
- Independent_Reproduction_NOT_Lecture_Code.json：以 StandardScaler + PCA 獨立核對的前兩個成分數值。這不是老師提供的實作或原始輸出；只能說它與課件的係數及變異比例相符。

## 教材範圍

PDF 共 13 頁。影片 386.8 秒，主要講解第 1–5 頁，末段展示第 6 頁；第 7–13 頁未在本段影片完整講解。TXT 亦在準備投影到兩維、留待下一段繼續時結束。

| 影片截圖 | 時間 | PDF 頁 | 內容 |
|---|---|---:|---|
| V01 | 00:30 | 1 | 課程標題 |
| V02 | 01:00 | 2 | 內容總覽 |
| V03 | 02:05 | 3 | Loading 定義與解讀 |
| V04 | 03:40 | 4 | Wine 資料 |
| V05 | 05:00 | 5 | 兩個 loading bar charts |
| V06 | 06:20 | 6 | Scores 圖預告 |

## 必須保留的澄清

1. TXT 先說 178，之後出現 138；PDF 與官方 Wine 資料都是 178。不確定 138 是口誤還是轉錄錯誤。
2. PDF 第 3 頁的 i 是主成分索引，第 8 頁的 i 是樣本索引。本包統一 k 為主成分索引。
3. PDF 第 9 頁的「內積 = 投影長度」需要單位向量或相應尺度条件。一般要乘上方向向量的長度。
4. 高／低／平均是相對於前處理後零點、以及保留主成分作出的近似重建；不等於原始特徵的精確值。
5. Biplot 圖沒有提供完整縮放實作，不能把顯示的箭嘴端點直接視為原始 loading。
6. PC2 的 Acid & Color Balance 是課件的解釋性命名；Top 6 圖本身不足以證明它是單純酸度指標。

## 官方補充核對

- scikit-learn: load_wine — https://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_wine.html
- scikit-learn: PCA — https://scikit-learn.org/stable/modules/generated/sklearn.decomposition.PCA.html
- scikit-learn: Common pitfalls — https://scikit-learn.org/stable/common_pitfalls.html

來源 PDF、影片與 TXT 的檔名與本次上傳一致；所有學生數字例子均明示為教學自建，而非課件中的 Wine 資料。

## PCA_Interpretation_11_Worked_Example

# CARD 11 — 四個學生的完整數字例子

這是教學自建資料，不是 Wine dataset。兩科原始平均都是 50；先減 50，只中心化，沒有再標準化。

| 學生 | 原始數學 | 原始科學 | 中心化數學 | 中心化科學 | PC1 score | PC2 score |
|---|---:|---:|---:|---:|---:|---:|
| A | 56 | 58 | 6 | 8 | 10 | 0 |
| B | 44 | 42 | −6 | −8 | −10 | 0 |
| C | 46 | 53 | −4 | 3 | 0 | 5 |
| D | 54 | 47 | 4 | −3 | 0 | −5 |

\[
z_{i1}=0.6x_{i1}+0.8x_{i2},\qquad z_{i2}=-0.8x_{i1}+0.6x_{i2}
\]

**符號：**i 是學生；x_i1 是該生中心化數學，x_i2 是中心化科學；z_i1、z_i2 分別是 PC1、PC2 score；0.6、0.8、−0.8、0.6 是對應的 loading。下標 1、2 在 x 中代表科目，在 z 中代表主成分。

**驗算 C：**PC1 = 0.6×(−4)+0.8×3=0；PC2 = −0.8×(−4)+0.6×3=5。

**重建 C：**數學 = 0×0.6+5×(−0.8)=−4；科學 = 0×0.8+5×0.6=3。最後各加平均 50，得到 46、53。

**只留 PC1：**C 和 D 的 PC1 score 都為 0，所以壓縮後分不開；若用 PC1 重建，兩人都回到平均 (50,50)。這展示丟掉一個方向會丟掉某種差異。

**變異：**PC1 scores 平方和 200，PC2 平方和 50；兩者平均都為零、除數相同，所以 PC1 占 80%，PC2 占 20%。

## PCA_Interpretation_12_Domain_Knowledge

# CARD 12 — Domain Knowledge 與判讀限制

來源：PDF 第 12、13 頁；最後一段為官方實務補充。

**PCA 提供：**共同變化模式、最大變異方向、變異的量化，以及其數學準則下的線性壓縮。

**人需要判斷：**模式的領域意義、是否只是量測或前處理造成的現象、如何命名主成分、哪些方向真正對問題重要。

**七項檢查：**看多個 PC；對照領域預期；用外部資料或知識驗證；不強行解釋；承認模糊；考慮不同解釋；把 PCA 用於探索而非直接確認假說。

**例子：**PC1 與某些化學成分同向，不等於高 PC1 的酒更健康、較高級或比較貴。這些結論需要不同的量測與驗證。

**K 的作用：**K 是保留的主成分數。保留更多主成分，不會增加同一資料、同一 PCA 下的最小平方重建誤差；但不保證下游分類準確率或新資料表現改善。

**WHY：**PCA 按輸入資料的變異排序，而不是按預測標籤的幫助排序。高變異不自動等於高預測價值。

**實務補充：**用於預測評估時，先切 train/test，再只用 training data 學 scaler 與 PCA；test 只 transform。官方參考：scikit-learn，Common pitfalls and recommended practices。

## Connections

[[Unsupervised Learning MOC]] · [[Unsupervised Learning - Module 2 MOC]] · [[Interpreting PCA-Biplots, Sign Ambiguity, and Pitfalls]] · [[Intuition Behind PCA- Linear Model for Dimensionality Reduction]]

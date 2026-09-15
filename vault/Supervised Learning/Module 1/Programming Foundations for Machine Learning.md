---
course: Supervised Learning
module: 1
status: curated
tags:
  - supervised
  - module-1
  - machine-learning
publish: true
---

# Programming Foundations for Machine Learning

> [!info] Learning position
> Supervised Learning → Module 1 → Topic 8

## ISLP_Chapter_2_3_Introduction_to_Python_完整解讀

ISLP Chapter 2.3 — Lab: Introduction to Python

《An Introduction to Statistical Learning with Applications in Python》完整解讀（pp. 40–60）

零基礎友善｜中英術語對照｜逐步拆解｜Machine Learning 連結

整理重點：概念 → 語法 → 例子 → 常見陷阱 → ML 應用

0. Chapter 2.3 到底在教甚麼？

這個 Lab 並不是要把 Python 從零教到專家，而是要建立你完成後續 Statistical Learning labs 所需的最低工具箱：Jupyter、Python 基本語法、NumPy、Matplotlib、indexing、Pandas、data loading、for loop 與 string formatting。

章節主線

環境 → Basic Python → NumPy → Graphics → Slice / Indexing → Pandas DataFrame → Data Selection → For Loops / Formatting。

小節

主題

真正要掌握

2.3.1

Getting Started

Python3、Jupyter、ISLP package

2.3.2

Basic Commands

function、string、list、concatenation

2.3.3

Numerical Python

NumPy array、shape、dtype、random、statistics

2.3.4

Graphics

figure、axes、plot、scatter、subplots、contour

2.3.5

Sequences / Slice

linspace、arange、[start:stop]

2.3.6

Indexing Data

rows、columns、submatrix、Boolean indexing

2.3.7

Loading Data

Pandas、CSV、missing values、loc/iloc

2.3.8

For Loops

iteration、nested loop、zip、formatting

1. 2.3.1 Getting Started：環境準備

書中要求兩樣核心工具：Python 3 以及 Jupyter notebook interface。Jupyter 的價值是可以在同一份 notebook 中混合 code、文字、數學及 output，特別適合統計與 ML 實驗。

Python 3：執行所有 labs 的程式語言。

Jupyter：逐 cell 執行 code，方便觀察每一步結果。

ISLP package：提供本書 datasets 及 custom-built functions。

Lab notebook：Ch2-statlearn-lab.ipynb。

pip install ISLPjupyter lab Ch2-statlearn-lab.ipynb

你需要理解的不是安裝指令本身

真正重點是：Python 是語言；Jupyter 是執行/互動環境；ISLP 是額外 package。三者角色不同。

2. 2.3.2 Basic Commands

2.1 Function 與 arguments

Python 很多操作都透過 function 完成。基本模式是 function_name(arguments)。

print("fit a model with", 11, "variables")# fit a model with 11 variables

print() 可以接受多個 arguments。這裡文字與整數會被一起輸出。

2.2 在 Jupyter 用 ? 看 documentation

print?np.array?

這是讀本書 labs 很重要的技能：遇到 function 不懂時，不一定要死背，先看 signature、arguments 與說明。

2.3 數值加法 vs 字串 concatenation

3 + 5# 8"hello" + " " + "world"# 'hello world'

同一個 + operator 會因 data type 不同而有不同意義。對 number 是 arithmetic addition；對 string 是 concatenation。

2.4 Sequence 與 List

x = [3, 4, 5]y = [4, 9, 7]x + y# [3, 4, 5, 4, 9, 7]

這是本章第一個關鍵轉折

Python list + list 不會逐元素相加。它只是把兩個 sequence 接在一起。要做 numerical vector operations，下一節要用 NumPy。

3. 2.3.3 Introduction to Numerical Python（NumPy）

3.1 package、module、alias

import numpy as np

numpy 是 numerical Python package；as np 只是給它一個短 alias。之後 np.array() 表示「呼叫 numpy 裡的 array function」。

3.2 NumPy Array：真正的 numeric vector

x = np.array([3, 4, 5])y = np.array([4, 9, 7])x + y# array([7, 13, 12])

與 list 不同，NumPy array 會做 element-wise addition。這正是線性代數與 ML 所需要的行為。

操作

Python List

NumPy Array

[3,4,5] + [4,9,7]

接在一起

—

np.array(...) + np.array(...)

—

逐元素相加

主要用途

一般物件集合

numerical vector / matrix

3.3 1D array、2D array、ndim

x = np.array([[1, 2],              [3, 4]])x.ndim# 2

ndim = number of dimensions。上例是 2D：有 row 和 column。

3.4 dtype：array 裡的數值類型

np.array([[1, 2], [3, 4]]).dtype# int64np.array([[1, 2], [3.0, 4]]).dtype# float64

如果 array 中出現 decimal，NumPy 通常會把整個 numeric array 升成 floating-point type，以便統一運算。

3.5 shape：每個 dimension 有多大

x.shape# (2, 2)

(2,2) = 2 rows × 2 columns。注意 shape 本身是一個 tuple。

3.6 Method vs Function

x = np.array([1, 2, 3, 4])x.sum()np.sum(x)# 都得到 10

形式

理解

x.sum()

sum 是 x object 的 method

np.sum(x)

把 x 當 argument 傳給 NumPy function

之後 Pandas / scikit-learn 會大量出現 object.method() 形式，所以這個 distinction 非常重要。

3.7 reshape：同一批元素，換一個 shape

x = np.array([1, 2, 3, 4, 5, 6])x_reshape = x.reshape((2, 3))# [[1, 2, 3],#  [4, 5, 6]]

6 個元素可以 reshape 成 2×3 或 3×2，但不能 reshape 成 4×2，因為元素總數不一致。

Row-major ordering

NumPy 預設按 row 填入 reshape 後的 array：先填第一 row，再填下一 row。

3.8 0-based indexing：A[row, column]

A = np.array([[1, 2, 3],              [4, 5, 6]])A[0, 0]  # 1A[1, 2]  # 6

第一個位置是 row index，第二個是 column index；兩者都由 0 開始。

3.9 reshape 可能共享 memory：非常值得留意

書中示範：修改 reshaped array 的某個元素，原本 x 的對應元素也改了。原因是它們可能共享同一段 memory，而不是建立完全獨立的 copy。

x = np.array([1,2,3,4,5,6])r = x.reshape((2,3))r[0,0] = 99# x 的第一個元素也可能變成 99

實務陷阱

當你只想建立獨立資料時，要理解 view vs copy。否則你改了『新變數』，原資料也可能被改。

3.10 Tuple immutable

my_tuple = (3, 4, 5)# my_tuple[0] = 2  -> TypeError

書中用這個例子再次強調：tuple 和 array/list 不同，tuple elements 不能直接被重新指定。

3.11 shape、ndim、T（transpose）

x_reshape.shapex_reshape.ndimx_reshape.T

T 會把 rows 和 columns 對調。例如 2×3 matrix transpose 後變成 3×2。這與 Linear Algebra 的轉置完全相同。

3.12 Element-wise mathematical functions

np.sqrt(x)x**2x**0.5

NumPy 對 array 的很多數學 operation 都會 element-wise 套用。這是 vectorized computing 的基礎。

3.13 Random Normal Variables

x = np.random.normal(size=50)y = x + np.random.normal(    loc=50,    scale=1,    size=50)

Argument

意思

loc

Normal distribution 的 mean

scale

standard deviation

size

要產生多少個值 / shape

這裡也帶出 keyword argument：你可以用 loc=、scale=、size= 指定參數，不必只靠位置判斷。

3.14 Correlation Matrix

np.corrcoef(x, y)# 對角線通常是 1# off-diagonal 是 x 與 y 的 correlation

Correlation 越接近 +1 代表強正線性關係；接近 -1 代表強負線性關係；接近 0 表示線性關係較弱。

3.15 Random Seed / Reproducibility

rng = np.random.default_rng(1303)rng.normal(scale=5, size=2)

如果不固定 random generator，每次執行會產生不同結果。設定固定 seed 的目的是讓別人或未來的你能重現同一實驗。這是 statistical learning 的基本科研習慣。

Machine Learning 實務

Train/test split、random initialization、sampling 都可能涉及 randomness。沒有 reproducibility，debug 和比較模型會變得困難。

3.16 Mean、Variance、Standard Deviation

np.mean(y)np.var(y)np.std(y)# 也可以：y.mean()y.var()y.std()

書中特別提醒：NumPy 的 np.var() 預設除以 n，而不是統計課常見 sample variance 的 n−1。要控制分母，可查看 ddof argument。

3.17 axis：到底沿哪個方向計算？

X.shape# (10, 3)X.mean(axis=0)# 對每個 column 求 mean，最後得到 3 個數

最容易混淆

axis=0 的意思不是『求第 0 row』。它表示把 axis 0（rows）壓縮掉，所以結果是每個 column 的統計量。

4. 2.3.4 Graphics：Matplotlib

Python 本身不是為 data analysis 專門設計，因此 plotting 依賴 Matplotlib。書中最重要的 object 是 figure 與 axes。

Object

直覺理解

figure

整張畫布 / 整個 plotting window

axes

其中一個實際 plot 區域，包含 x/y label、title 等

from matplotlib.pyplot import subplotsfig, ax = subplots(figsize=(8, 8))ax.plot(x, y)

4.1 Tuple unpacking

subplots() 回傳兩個 object。fig, ax = ... 是 tuple unpacking；等價於先存 output，再取 output[0] 和 output[1]。

4.2 Line plot vs Scatterplot

ax.plot(x, y)          # default: lineax.plot(x, y, 'o')     # pointsax.scatter(x, y)       # scatterplot

4.3 Semicolon 在 Jupyter 的作用

一行最後加 ; 可以抑制 notebook 額外顯示 object 的文字 representation，但不會阻止 plot 出現。

4.4 Labels 與 Title

ax.set_xlabel("x")ax.set_ylabel("y")ax.set_title("Plot of X vs Y")

4.5 Multiple subplots

fig, axes = subplots(    nrows=2,    ncols=3,    figsize=(15, 5))axes[0, 1].plot(x, y, 'o')axes[1, 2].scatter(x, y, marker='+')

這裡 axes 自己就是一個 2D array of Axes objects，因此 axes[0,1] 的讀法跟 matrix indexing 很像。

4.6 Save Figure

fig.savefig("Figure.png", dpi=400)fig.savefig("Figure.pdf", dpi=200)

dpi = dots per inch，主要影響 raster image 的 resolution。

4.7 Contour 與 Heatmap

Contour plot 用 x、y 和 z matrix 表示三維 surface，就像地形等高線；imshow() 則把 z 值用顏色映射成 heatmap。

x = np.linspace(-np.pi, np.pi, 50)y = xf = np.multiply.outer(np.cos(y), 1 / (1 + x**2))ax.contour(x, y, f)ax.imshow(f)

5. 2.3.5 Sequences and Slice Notation

5.1 np.linspace() vs np.arange()

np.linspace(0, 10, 11)# 0.0 ... 10.0，共 11 個點，包含終點np.arange(0, 10)# 0 ... 9，stop 10 不包括

Function

你控制甚麼

End 是否通常包括

np.linspace(a,b,n)

點的數量 n

包括 b

np.arange(start,stop,step)

步距 step

不包括 stop

5.2 Slice notation

"hello world"[3:6]# 'lo '

3:6 等價於 slice(3,6)。由於 index 由 0 開始，而且 stop 不包括，因此取的是 index 3、4、5。

記憶方式

Python slice 幾乎永遠先想成 [start, stop)：左邊包括，右邊不包括。

6. 2.3.6 Indexing Data

6.1 建立 4×4 array

A = np.array(np.arange(16)).reshape((4, 4))# [[ 0,  1,  2,  3],#  [ 4,  5,  6,  7],#  [ 8,  9, 10, 11],#  [12, 13, 14, 15]]

6.2 單一元素：A[row, column]

A[1, 2]# 6

index 1 = 第二 row；index 2 = 第三 column。交叉位置就是 6。

6.3 選多個 rows

A[[1, 3]]# 選第二、第四 row

6.4 選多個 columns

A[:, [0, 2]]# : = 所有 rows# [0,2] = 第一、第三 columns

6.5 Advanced indexing 的坑

A[[1, 3], [0, 2]]# 結果不是 2x2 submatrix# 而是配對抓 A[1,0] 與 A[3,2]

當兩個 list 同時作 index，NumPy 會把它們視為 coordinate pairs，而不是 rows × columns 的 Cartesian product。

這一點非常重要

[1,3] 和 [0,2] 不是『選 row 1/3，再選 col 0/2』；它是『(1,0)、(3,2)』兩個座標。

6.6 正確抽 submatrix 的方法

A[[1, 3]][:, [0, 2]]# 或idx = np.ix_([1, 3], [0, 2])A[idx]# 或當規律適合 slice 時A[1:4:2, 0:3:2]

np.ix_() 會幫你建立適合 submatrix selection 的 mesh。

6.7 Boolean Indexing

keep_rows = np.array([False, True, False, True])A[keep_rows]# 只保留 True 對應的 rows

Boolean mask 是 Data Science 最重要的 selection 思維之一：每一 row 先回答『保留嗎？』，True 就留下。

6.8 Boolean 與 integer 看似 0/1，但 indexing 意義不同

np.array([0,1,0,1]) 是 integer index，會要求第 0、1、0、1 rows；[False,True,False,True] 則是 Boolean mask，只保留第二和第四 rows。

7. 2.3.7 Loading Data：Pandas

真正 dataset 通常同時有數值、文字、欄位名稱與 missing values。Pandas DataFrame 比純 NumPy array 更適合這種 tabular data。

7.1 Read CSV

import pandas as pdAuto = pd.read_csv("Auto.csv")

大部分分析工作的第一步就是把外部 dataset 讀進 Python。

7.2 Data type 問題：horsepower 被讀成 object

書中 Auto dataset 的 horsepower 本來應該是 numeric，但因為其中用 '?' 表示 missing value，整欄被解讀為 object/string-like data。

Auto["horsepower"].dtype# object

7.3 用 na_values 正確標記 missing data

Auto = pd.read_csv(    "Auto.data",    na_values=["?"],    delim_whitespace=True)

這會把 '?' 轉成 np.nan，令 horsepower 能被正確視為 numeric data。

Data Cleaning 原則

模型之前先處理 encoding、dtype、missing values。很多『模型問題』其實是資料問題。

7.4 shape 與 dropna()

Auto.shape# (397, 9)Auto_new = Auto.dropna()Auto_new.shape# (392, 9)

原本 397 rows × 9 columns；移除含 missing 的 5 rows 後剩 392 rows。這裡只是示範做法，不代表所有 dataset 都應該直接 dropna。

7.5 columns

Auto.columns

先檢查 variable names，是 data inspection 的基本動作。

7.6 用 slice 選 rows

Auto[:3]# 前 3 rows

7.7 Boolean filter

idx_80 = Auto["year"] > 80Auto[idx_80]

Auto['year'] > 80 先產生一個 Boolean Series；再用它篩選 rows。這和前面的 NumPy Boolean indexing 是同一個思維。

7.8 用 column name 選 columns

Auto[["mpg", "horsepower"]]

注意雙層 [ ]：外層是 DataFrame indexing；內層 list 表示要多個 column names。

7.9 set_index()：把某欄變成 row labels

Auto_re = Auto.set_index("name")

之後 row index 不再只是 0、1、2…，而可以用 car name 找 row。

7.10 loc vs iloc

方法

依據

例子

loc[]

label / Boolean

df.loc['ford torino']

iloc[]

integer position

df.iloc[3]

rows = ["amc rebel sst", "ford torino"]Auto_re.loc[rows]Auto_re.iloc[[3, 4]]Auto_re.iloc[:, [0, 2, 3]]Auto_re.iloc[[3,4], [0,2,3]]

最簡單記法

loc = labels / logical conditions；iloc = integer location。

7.11 Index 不一定 unique

書中指出 car name 可能重複。因此 loc['ford galaxie 500'] 可以返回多個 rows。Row label 並不保證永遠唯一。

7.12 多條件 Boolean filtering

Auto_re.loc[    (Auto_re["year"] > 80) & (Auto_re["mpg"] > 30),    ["weight", "origin"]]

& 是 element-wise AND；| 是 element-wise OR。對 Pandas conditions 通常要把每個條件用括號包住。

7.13 lambda filter

Auto_re.loc[    lambda df: df["year"] > 80,    ["weight", "origin"]]

lambda 是 anonymous function：臨時定義一個小 function。這裡 df 進來後，回傳 Boolean condition。

7.14 str.contains()

df.index.str.contains("ford") | df.index.str.contains("datsun")

這把 string operation 和 Boolean filtering 結合：可依文字內容篩選 rows。

8. 2.3.8 For Loops

8.1 基本 loop

total = 0for value in [3, 2, 19]:    total += valueprint(total)# 24

Indented block 會對 sequence 中每個 value 執行一次。Python 用 indentation 表示 block，這不是純美觀，而是語法的一部分。

8.2 +=

total += value# 等價於total = total + value

8.3 Nested loops

total = 0for value in [2, 3, 19]:    for weight in [3, 2, 1]:        total += value * weight

Nested loop 會跑所有 combinations。外層每一次，內層都完整跑一遍。

8.4 zip()：成對一起走

total = 0for value, weight in zip(    [2, 3, 19],    [0.2, 0.3, 0.5]):    total += value * weight# 10.8

zip() 會形成 (value, weight) pairs，而不是所有 value × weight combinations。這非常適合 weighted average。

9. String Formatting

本章最後把 loop 和 string formatting 結合，用來產生 data-quality summary。

template = 'Column "{0}" has {1:.2%} missing values'print(template.format("food", 0.203))# Column "food" has 20.30% missing values

{0} 放第一個 argument；{1:.2%} 把第二個 argument 轉成百分比並保留兩位小數。

9.1 用 loop 檢查每欄 missing percentage

for col in D.columns:    template = 'Column "{0}" has {1:.2%} missing values'    print(        template.format(            col,            np.isnan(D[col]).mean()        )    )

np.isnan(D[col]) 會得到 True/False；Boolean 的 True 可視為 1、False 為 0，因此取 mean 就得到 missing proportion。這是一個非常漂亮的『Boolean → 數值統計』例子。

10. Chapter 2.3 的概念連鎖

Python function / sequence        ↓NumPy array        ↓shape / dtype / vectorized math        ↓randomness + statistics        ↓Matplotlib visualization        ↓slice / indexing / Boolean mask        ↓Pandas DataFrame        ↓load + clean + select data        ↓for loop / formatting        ↓準備好進入後續 Statistical Learning Labs

11. 最需要真正理解的 15 個考點 / 實務點

Python list + list 是 concatenation，不是 element-wise addition。

NumPy array + array 才會做 element-wise numeric operation。

0-based indexing：第一個位置是 0。

slice stop 不包括。

shape 是每個 dimension 的大小；ndim 是 dimension 數量。

method 形式 x.sum() 與 function 形式 np.sum(x) 的概念差別。

reshape 只改 shape，不改元素總數；而且可能與原 array 共享 memory。

Tuple immutable。

random seed 是 reproducibility 的核心。

np.var() 的預設 denominator 與 sample variance 的 n−1 要分清楚。

axis=0 通常得到每個 column 的結果。

Matplotlib 的 figure 與 axes 是不同 object。

Advanced indexing 用兩個 lists 時會配對座標，不一定得到 submatrix。

Boolean mask 是 NumPy/Pandas selection 的核心。

Pandas：loc 看 label/Boolean；iloc 看 integer position。

12. 初學者最常見 10 個錯誤

錯誤

為甚麼

正確方向

忘記 import numpy as np

np 未被定義

先 import

list + list 期待數值相加

list 的 + 是 concatenation

轉成 np.array

把第 1 個元素寫成 x[1]

Python 由 0 開始

第一個是 x[0]

以為 x[0:3] 包括 index 3

stop exclusive

只取 0,1,2

reshape 元素數不匹配

shape product 不等於元素總數

先算 rows×cols

修改 view 後原資料也改

共享 memory

需要時明確 copy

把 axis=0 當 row 0

axis 是被壓縮的方向

看 output shape

CSV numeric column 變 object

混入 '?'/文字

設定 na_values / clean

loc / iloc 混淆

一個看 label、一個看 position

loc=label；iloc=integer

Pandas 條件用 and/or

Series 要 element-wise operator

使用 & 和 |，並加括號

13. 一頁 Cheat Sheet

目的

指令

匯入 NumPy

import numpy as np

建 array

np.array([...])

看維度數

x.ndim

看 shape

x.shape

看 dtype

x.dtype

總和

x.sum() / np.sum(x)

reshape

x.reshape((r,c))

transpose

x.T

Normal random

rng.normal(...)

mean / var / std

np.mean / np.var / np.std

建立 figure

fig, ax = subplots(...)

scatter

ax.scatter(x,y)

sequence

np.arange / np.linspace

slice

x[start:stop:step]

Boolean filter

A[mask]

讀 CSV

pd.read_csv(...)

移除 NA

df.dropna()

columns

df.columns

label selection

df.loc[...]

position selection

df.iloc[...]

loop

for x in sequence:

paired loop

for a,b in zip(A,B):

14. 你應該如何練習這一章

1.  不要先看 output：每個 code cell 先自己預測結果。

2.  特別練 0-based index、slice stop exclusive、A[row,column]。

3.  把 Python list 改成 NumPy array，再比較 + 的行為。

4.  自己建立 3×4 matrix，練 row / column / submatrix / Boolean mask。

5.  做一個小 DataFrame，故意加入 missing value，再清洗。

6.  用 loc 與 iloc 分別選同一批 rows，確認兩者差異。

7.  固定 random seed，證明兩次執行結果相同。

8.  畫 scatterplot，加入 title、x label、y label。

9.  寫一個 for loop 計算 weighted average，再用 np.sum 驗算。

10.  最後把全部步驟放進同一個 Jupyter notebook，形成自己的 mini data-analysis workflow。

來源與使用說明

主要來源：James, Witten, Hastie, Tibshirani & Taylor，《An Introduction to Statistical Learning with Applications in Python》，Chapter 2.3 Lab: Introduction to Python，pp. 40–60（使用者提供 PDF）。

本文件為教學解讀與重組，不是逐字轉錄。內容按 2.3.1–2.3.8 的原有學習順序整理，並加入初學者解釋、錯誤分析、ML 連結及自訂例子。

若之後進入 Chapter 3/4 的 regression/classification labs，這一章最重要的先修是 NumPy indexing、Pandas loc/iloc、Boolean filtering、shape/axis 與 basic plotting。

## Programming_Foundations_for_Machine_Learning_完整筆記

Programming Foundations for Machine Learning

完整初學者筆記：由 Python 語法一路連接到 NumPy、Pandas、Plotting 與 Model Evaluation

零基礎友善｜中英術語對照｜逐步拆解｜Machine Learning 連結

整理重點：概念 → 語法 → 例子 → 常見陷阱 → ML 應用

如何使用這份筆記

這份筆記將課程的 37 分鐘內容重新整理成一條完整學習路線。重點不是死背 Python 語法，而是理解每個語法在 Machine Learning workflow 中扮演甚麼角色。

整堂課一句話

Python 基礎 → 資料處理 → 表格資料 → 視覺化 → 模型評估。

課程地圖

階段

內容

你要做到

ML 連結

1

Python basics

看得懂變數、data type、list、index

所有資料與程式邏輯的基礎

2

Control flow & functions

用 if / function 表達規則

資料清理、feature engineering、pipeline

3

Data structures

懂 dict / comprehension / OOP 基礎

組織 feature、metadata、模型元件

4

NumPy & Pandas

操作 array / DataFrame

真正的 ML dataset

5

Plotting & evaluation

畫圖、理解 MSE

比較模型表現

1. 為甚麼 Machine Learning 常用 Python？

Python 的核心價值不是「它是最快的語言」，而是語法清楚、開發速度快，而且 NumPy、Pandas、Matplotlib 及大量 ML libraries 已經形成完整生態。

Readable syntax：程式較接近人類閱讀方式。

Less boilerplate：相比 C / C++，很多基本工作不用寫大量樣板語法。

Fast iteration：更容易快速測試不同資料處理方法及模型。

Debugging：程式結構清楚時，更容易找出資料或模型錯誤。

Reproducibility：把處理步驟寫成 code，可以重複執行同一 pipeline。

ML 思維

Machine Learning 不只是「model.fit()」。真正工作往往是：讀資料 → 清洗 → 轉型 → 建 feature → train → evaluate → debug。Programming 是把這些步驟可靠地串起來。

2. Python Data Types

Data type 可以理解為：Python 需要知道某個 value 是「甚麼種類的東西」，因為不同類型支援不同操作。

Type

中文理解

例子

常見 ML 用途

int

整數

5, -3, 100

count、class label

float

小數 / 實數

3.14, 0.75

probability、feature、loss

str

文字

"Toronto"

category、text feature

bool

真假

True / False

filter、condition

None

沒有值

None

尚未設定 / missing-like state

list

可修改序列

[1,2,3]

暫存多個 items

tuple

不可修改序列

(1,2,3)

shape、固定設定

dict

key-value

{"age":30}

feature / metadata mapping

2.1 int 與 float

type(5)      # inttype(5.0)    # floattype("5.0")  # str

數學上 5 和 5.0 表示相同大小，但程式中的 data type 不同；而 "5.0" 更是文字。資料載入後 type 錯誤，是 Data Science 很常見的 bug。

2.2 str：引號令內容變成文字

price = 50000price_text = "50000"# price 可以直接做數值運算# price_text 先是文字

常見錯誤

CSV 某一欄本來應該是數字，但因為混入「?」「N/A」等文字，整欄可能被讀成 object/string。這會令平均、模型輸入等操作失敗。

2.3 bool：程式的 Yes / No

100 > 0       # True100 < 0       # Falserisk_score > 80

Boolean 是 control flow 的核心。任何 filter、rule 或 decision，通常先變成 True / False。

2.4 None：暫時沒有 value

age = Noneif age is None:    print("Age not available")

None 不等於 0，也不等於空字串。它通常表示「目前沒有 object / value」。

3. List：Python 最重要的基本序列

x = [10, 20, 30, 40]# index:#      0   1   2   3#     10  20  30  40

Python 採用 0-based indexing：第一個元素的 index 是 0。這個規則之後會一路延伸到 NumPy、Pandas 的 positional indexing。

自我檢查

Q：x = [10,20,30,40]，x[2] 是多少？A：30。因為 index 0→10、1→20、2→30。

3.1 List 可以修改（mutable）

x = [1, 2, 3]x.append(4)# [1, 2, 3, 4]

Mutable 的意思是 object 建立後，內容仍可以修改。Tuple 則相反。

3.2 List 可以混合 type，但不代表這總是好事

x = [1, "hello", None, [5, 6]]

Python 給你很大自由，但 ML dataset 通常希望同一 numeric feature 維持一致 numeric type。

3.3 Concatenation 不是逐元素加法

[1, 2] + [3, 4]# [1, 2, 3, 4]

對 list 而言，+ 代表 concatenation；要做向量逐元素加法，之後會使用 NumPy array。

4. Indexing、Slicing、Negative Index

4.1 Indexing

x = [10, 20, 30, 40]x[0]   # 10x[3]   # 40

4.2 Slicing：x[start:stop:step]

x = [10, 20, 30, 40, 50]x[1:4]      # [20, 30, 40]x[0:5:2]    # [10, 30, 50]

最重要規則

start 包括；stop 不包括。可以記成 [start, stop)。

因此 x[1:4] 會取 index 1、2、3，不會取 index 4。

4.3 Negative indexing

x[-1]   # 最後一個x[-2]   # 倒數第二個

4.4 用 [::-1] 反轉

[1, 2, 3, 4][::-1]# [4, 3, 2, 1]

第三個位置是 step；step = -1 代表向後逐個走。

5. Tuple：與 List 最大分別是不可修改

my_tuple = (3, 4, 5)# my_tuple[0] = 2  -> TypeError

Tuple 是 immutable。常見用途包括 shape、固定設定、function return 的多個結果。單一元素 tuple 需要逗號，例如 (5,)。

特性

List

Tuple

符號

[ ]

( )

可修改

是

否

append

可以

不可以

典型用途

動態資料集合

固定結構 / shape / settings

6. Control Flow：讓程式根據條件做決定

Control flow 的核心是：先計算 condition，再根據 True / False 決定要不要執行某段 code。

balance = 100withdrawal = 50if withdrawal > 0 and balance - withdrawal >= 0:    balance = balance - withdrawal

這個銀行例子顯示：一個有效提款不只是 balance > 0，還要確認 withdrawal 為正數，而且扣除後不能變成負數。

6.1 Chained comparison

0 < balance <= 100

Python 可以把數學式的連續比較直接寫出來，這是它可讀性高的一個例子。

7. String Handling

String 可以視為有順序的 characters，因此可以使用 indexing 和 slicing。

text = "hello"text[0]   # 'h'text[1:4] # 'ell'

7.1 split(): String → List

"I love data science".split()# ['I', 'love', 'data', 'science']

7.2 join(): List → String

words = ["I", "love", "data", "science"]" ".join(words)# 'I love data science'

ML 連結

Text classification、tokenization、資料清洗時，你會不斷把文字拆開、清理，再重新組合。

8. Functions：把一段邏輯包裝成可重用單位

def square(x):    return x * xsquare(5)   # 25

Function 可以理解成 input → transformation → output。Machine Learning model 本身也可抽象地理解為 X → f(X) → prediction。

8.1 Parameters vs Arguments

名詞

意思

例子

parameter

function 定義中的變數名稱

def square(x) 的 x

argument

呼叫 function 時真正傳入的值

square(5) 的 5

return

function 送回的結果

25

8.2 Default arguments

def f(a, b=0, c=3):    return (a + b) * cf(1)       # (1 + 0) * 3f(1, 2)    # (1 + 2) * 3

8.3 Mutable default argument 陷阱

# 不建議def add_item(x=[]):    x.append(1)    return x# 較安全def add_item(x=None):    if x is None:        x = []    x.append(1)    return x

原因是 default list object 可能在多次 function call 之間被重用，造成你以為是「新 list」，其實內容一直累積。

8.4 Argument unpacking

values = [3, 2, 1]f(*values)# 概念上相當於f(3, 2, 1)

* 可以把 sequence 展開成 positional arguments。現階段知道概念即可。

9. Dictionary：Key → Value

house = {    "square_footage": 1000,    "bedrooms": 2,    "bathrooms": 2}house["bedrooms"]   # 2

Dictionary 很適合表示具有名稱的 feature 或 metadata。相比純 list，[1000,2,2] 不知道每個數字代表甚麼；dict 則自帶 label。

9.1 .get()：更安全的 lookup

student = {"name": "Bob", "gpa": 3.4}student.get("age", None)# key 不存在時，不必立即拋出 KeyError

實務思維

資料 pipeline 經常遇到 optional field。使用安全 lookup 可以避免一個缺失欄位令整個程式崩潰。

10. List Comprehension

List comprehension 把「for loop + transformation + optional filter」縮成一行。

[i for i in range(10)][i**2 for i in range(10)][i for i in range(10) if i > 5]

第三個例子可以讀成：對 range(10) 裡每個 i，如果 i > 5，就把 i 放入新 list。

10.1 Nested comprehension 與矩陣

matrix = [[i + j for j in range(3)]          for i in range(2)]

這時 i 可以想成 row 方向，j 可以想成 column 方向。這與 Linear Algebra 的 aᵢⱼ 記號直接連接。

11. OOP：Class 與 Object 的最低限度理解

Class 是藍圖；Object 是依藍圖建立的具體實例。Machine Learning libraries 裡大量 API 都採用這種設計。

class BankAccount:    def __init__(self, balance=0):        self.balance = balance    def deposit(self, amount):        self.balance += amountaccount = BankAccount()account.deposit(100)

概念

理解

class

藍圖，例如 BankAccount

object / instance

由 class 建出的 account

attribute

object 儲存的資料，例如 balance

method

object 可以做的動作，例如 deposit()

constructor

建立 object 時初始化資料的 __init__

現階段不需要深入 inheritance、polymorphism；先看得懂 library object.method() 已經很重要。

12. NumPy：由 Python List 進入 Numerical Computing

import numpy as npx = np.array([3, 4, 5])y = np.array([4, 9, 7])x + y# array([7, 13, 12])

這裡正好展示 List 和 NumPy array 的差別：List + List 是 concatenation；NumPy array + array 是逐元素運算。

12.1 Vector 與 Matrix

一維 array 常當 vector；二維 array 常當 matrix。假設 X 有 100 rows、5 columns，在 ML 中通常可理解成 100 samples × 5 features。

X.shape# (100, 5)

12.2 NumPy 的限制：column 沒有語意名稱

純 NumPy array 裡，你可能只知道 column 2，而不知道它其實是 square_footage。當資料有大量欄位時，這不方便，也容易出錯。這正是 Pandas DataFrame 的價值。

13. Pandas DataFrame：真正 Data Science 工作的核心

DataFrame 是帶有 row/column labels 的表格資料結構。可以把它想成更適合程式分析的 Excel table。

import pandas as pddf = pd.DataFrame({    "age": [25, 40],    "income": [50000, 80000],    "default": [0, 1]})

13.1 DataFrame 與 Series

DataFrame 是整張 table；單一 column 通常是 Series。

df["income"]# 一個 Series

13.2 先 inspect data，再 train model

df.head()df.shapedf.columnsdf.dtypes

Data Science 的第一步通常不是立即 model.fit()，而是先確認資料尺寸、欄位、type、missing value 和異常內容。

14. Matplotlib 與 Pandas Plotting

視覺化的目的不是裝飾，而是快速發現 relationship、outlier、distribution 或模型問題。

import matplotlib.pyplot as pltplt.plot([1, 2, 3], [10, 15, 12])plt.xlabel("x")plt.ylabel("y")

14.1 Scatterplot

df.plot(    x="cracks",    y="overall_quality",    kind="scatter")

Scatterplot 的每個點代表一個 observation。X 軸與 Y 軸的關係可以幫助你判斷是否存在 trend、cluster 或非線性關係。

15. Model Evaluation：Actual vs Predicted → MSE

課程最後將前面的 programming、data、plotting 概念串到模型評估。Mean Squared Error（MSE）用於衡量 regression prediction 與真實值的差距。

MSE = (1/n) * Σ (y_i - yhat_i)^2

符號

意思

n

data points 數量

yᵢ

第 i 個 actual value

ŷᵢ

第 i 個 predicted value

yᵢ - ŷᵢ

prediction error

(yᵢ - ŷᵢ)²

squared error

Σ / n

全部 squared errors 加起來再取平均

15.1 手算例子

Actual = [10, 20, 30]；Prediction = [12, 18, 33]。

Errors:       [-2, 2, -3]Squared:      [ 4, 4,  9]Sum:          17MSE:          17 / 3 = 5.67

MSE 越小，通常表示 prediction 越接近 actual；但真正模型選擇還要考慮 test set、overfitting、interpretability 等因素。

16. 把整堂課串成一條 Machine Learning Pipeline

Python  ↓Data Types  ↓Lists / Strings / Dictionaries  ↓Control Flow + Functions  ↓NumPy Arrays  ↓Pandas DataFrame  ↓Clean / Inspect Dataset  ↓Model  ↓Prediction  ↓Actual vs Predicted  ↓MSE  ↓Plot / Compare Models

17. 最值得優先掌握的 12 個概念

int / float / str / bool / None

List 與 0-based indexing

Slicing：start 包括、stop 不包括

Boolean condition 與 if

for loop 的基本閱讀能力

Function：input → output

Dictionary：key → value

List comprehension

NumPy array 與 shape

Pandas DataFrame / Series

資料 inspection：head / shape / columns / dtypes

Actual、Prediction 與 MSE

18. 一頁 Cheat Sheet

要做甚麼

常見 Python

看 type

type(x)

List 長度

len(x)

加元素

x.append(v)

取第一個

x[0]

取最後一個

x[-1]

切片

x[start:stop:step]

判斷

if condition:

定義 function

def f(x):

Dictionary 安全讀值

d.get(key, default)

匯入 NumPy

import numpy as np

建立 array

np.array([...])

看 shape

X.shape

匯入 Pandas

import pandas as pd

看前幾行

df.head()

選 column

df['column']

畫 scatter

df.plot(..., kind='scatter')

19. 常見誤解整理

誤解：List + List 會逐元素相加。正確：Python list 用 + 會 concatenation；NumPy array 才常做逐元素相加。

誤解：第一個 index 是 1。正確：Python 第一個 index 是 0。

誤解：slice stop 會被包括。正確：stop 不包括。

誤解：None = 0。正確：None 表示沒有 value / object。

誤解：DataFrame 和 Series 是同一樣東西。正確：DataFrame 是 2D table；Series 通常是 1D column。

誤解：Python 簡單就代表沒有深度。正確：語法入門容易，但 object model、NumPy、Pandas、ML ecosystem 非常深。

來源與使用說明

主要來源：使用者提供的《Programming Foundations for Machine Learning》Video Guide 與完整影片文字稿。

本文件為學習用重新整理與解讀；程式例子大多以教學目的重新組織，並加入 ML 應用連結、常見陷阱及初學者說明。

建議搭配 Jupyter Notebook 實際逐段執行 code；真正掌握 programming 的關鍵是『預測 output → 執行 → 解釋原因』。

## Connections

[[Supervised Learning MOC]] · [[Supervised Learning - Module 1 MOC]] · [[Model Accuracy and Bias-Variance Tradeoff]] · [[Regression vs Classification]]

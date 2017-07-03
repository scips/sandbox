# Machine Learning

**Usages**:

* **data mining**: large data manipulation (clicks, medical records, biology, chemestry, engineering)
* **new capabilities**: autonomous helicopter, handwriting recognition, natural language processing, computer vision
* **self-customizing**: amazon, netflix
* **understanding human learning**: real AI

## Definitions

[Arthur Samuel][1] (1959): _the field of study that gives computers the ability to learn without being explicitly programmed_

[Tom Mitchell][2] (1998): _A computer program is said to learn from experience **E** with respect to some class of tasks **T** and performance measure **P**, if its performance at tasks in **T**, as measured by **P**, improves with experience **E**_

Exemple:

* **T (task)**: classifying e-mail as spam or not, finding cancer, segmenting market
* **E (experience)**: watching you label mail as spam, watching you measure and classify tumor, finding group of individual sharing some behavior
* **P (performance)**: % of e-mail correctly marked as spam, % of tumor corectly classified, quality of the group (quantity, difference, similarities within the same group)

## Terminology

* **h**: hypotheses h(x) -> y
* **(x(i), y(i))**: in supervised learning assuming we have 'm' elements i is the indice of this element, x(i) is the value in input and y(i) is the measured value of the output
* **ho(X) = θ0 + θ1x**: h(x) Linear regression case in supervised learning with one varialble (x)


## Algorithms

### Supervised Learning

**Output Known + data set + relation between output and data**

* We have a data set
* We know what is the correct output (Right answer given)

#### Classification vs Regression

**Classification**: the output is discrete values {Red, Blue, Green}

Exemples: determine benign or malignant tumor, house overpriced based on sqm, 

**Regression**: the output is continuous values \[0.0 ... 1.0\] ∈ ℝ

Exemples: age based on a picture, house prices based on sqm

### Unsupervised learning

Exemples: News with similar content grouped together, grouping genes sequence together, market segmentation, astronomical data analysis, social network analysis, cocktail party problem (2 speakers 2 mics)

### Reinforcement learning

### Recommender systems

## Cost Function in Linear regression

* Use mean square distance (or difference) do determine whether θ0 and θ1 are well choosen
* the goal is to mimimize while changing parameters: (θ0, θ1) the value of 1/2m (ho(x)-y)²

## Links

[1]: https://en.wikipedia.org/wiki/Arthur_Samuel
[2]: http://www.cs.cmu.edu/~tom/

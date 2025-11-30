# Maths

## Equation générale du second degré
*Equation générale permettant de trouver les zéros, si ils existent, d'une équation du second degré*

Dans l'équation générale du second degré:
$$
a x^2 + b x + c = 0
$$

Si $a\not=0$ il existe deux solutions a l'équation $a x^2 + b x + c = 0$ qui sont:
$$
x = \frac{-b \pm \sqrt{b^2-4ac} }{2a}
$$

Nous avons
$$
x_1 = \frac{-b + \sqrt{b^2-4ac}}{2a}
$$
et
$$
x_2 = \frac{-b - \sqrt{b^2-4ac}}{2a}
$$

On pose: $\Delta = b^2 - 4 ac$ qu'on appelle le **Discrimant** de l'équation

Comme l'équation comprend une racine carrée de $\Delta$, dans $\mathbb{R}: $  $\sqrt{\Delta}$ n'existe que si $\Delta$ est null ou positif.

$$
\sqrt{\Delta} \in \mathbb{R} \iff \Delta \ge 0 
$$

### Démonstration

Démonstration généralisée basée sur *Al-kwhârizmi* 780-850 dite de *complétion du carré*.

Nous allong utiliser deux identités remarquables:
$$
(\alpha+\beta)^2=\alpha^2+2\alpha\beta+\beta^2 \tag{1}
$$

$$
\alpha^2-\beta^2=(\alpha-\beta)(\alpha+\beta) \tag{2}
$$
Nous allons également utiliser une astuce de calcul qui permet d'ajouter de part et d'autre de l'équation la même chose en garantissant que l'équation reste identique:
$$
A+B=C \implies A+B+D=C+D \tag{3}
$$

Nous allons faire en sorte de choisir $D$ tel que l'équation $a x^2 + b x + c = 0$ ressemble au produit remarquable $(\alpha+\beta)^2$ ce qui nous permettra de trouver les racines de l'équation facilement.

Soit 
$$
a x^2 + b x + c = 0 \tag{4}
$$
où $a\not=0$

On doit amener $(4)$ à ressembler à $(2)$

$$
ax^2+bx+c=0 \dashrightarrow (\alpha-\beta)(\alpha+\beta) = 0 
$$

trouver les zéros singifiera trouver ce qui annule un des facteurs du produit.

**Mais comment ?**

On va d'abord isoler $x^2$. Divisons tout par $a$

ça nous donne
$$
a x^2 + b x + c = 0 \iff x^2+\frac{b}{a}x+\frac{c}{a}=0
$$
car $a\not=0$

Regardons l'équation:

$$
x^2+\frac{b}{a}x+\frac{c}{a}=0 \tag{5}
$$

Comment faire en sorte qu'elle ressemble à (1):

$$
x^2+\frac{b}{a}x+\frac{c}{a}=0 \dashrightarrow \alpha^2+2\alpha\beta+\beta^2 
$$

On a $x^2 \rightarrow \alpha^2$. On en déduit que $x \rightarrow \alpha$.
On a donc $\frac{b}{a} \rightarrow 2\beta$.
Pour que l'équation soit de la forme: $\alpha^2+2\alpha\beta+\beta^2$
Il ne nous manque que: $\beta^2$.
Or si $\frac{b}{a} \rightarrow 2\beta$ alors $\frac{b}{2a} \rightarrow \beta $
Ce qui nous amène à ce début d'équation :

$$
x^2 + \frac{b}{a}x + (\frac{b}{2a})^2 ...
$$

on rajoute +D $(3)$ de part et d'autre de l'égalité en choisissant $D=(\frac{b}{2a})^2-(\frac{c}{a})$

$$
\iff x^2 + \frac{b}{a}x+\frac{c}{a} +(\frac{b}{2a})^2-(\frac{c}{a})=(\frac{b}{2a})^2-(\frac{c}{a})
$$

En posant $D$ tel quel, dans la partie gauche les $+(\frac{c}{a}) - (\frac{c}{a})$ s'annulent

$$
\iff x^2 + \frac{b}{a}x+(\frac{b}{2a})^2=(\frac{b}{2a})^2-(\frac{c}{a})
$$

Nous avons spécialement choisi $D=(\frac{b}{2a})^2-(\frac{c}{a})$ pour obtenir la forme $(\alpha+\beta)^2 = \alpha^2+2\alpha\beta+\beta^2$. On remarque que c'est le cas dans la partie de gauche avec $\alpha = x$ et avec $\beta = \frac{b}{2a}$

En effet $(x + \frac{b}{2a})^2=x^2+2x\frac{b}{2a}+(\frac{b}{2a})^2$

Nous pouvons donc écrire:
$$
\iff (x+\frac{b}{2a})^2=(\frac{b}{2a})^2-(\frac{c}{a})
$$

On soustrait de part et d'autre la partie de droite: $(\frac{b}{2a})^2-(\frac{c}{a})$

$$
\iff (x+\frac{b}{2a})^2-((\frac{b}{2a})^2-(\frac{c}{a}))=((\frac{b}{2a})^2-(\frac{c}{a}))-((\frac{b}{2a})^2-(\frac{c}{a}))
$$

$$
\iff (x+\frac{b}{2a})^2-((\frac{b}{2a})^2-(\frac{c}{a}))=\cancel{((\frac{b}{2a})^2-(\frac{c}{a}))}-\cancel{((\frac{b}{2a})^2-(\frac{c}{a}))}
$$

$$
\iff (x+\frac{b}{2a})^2-((\frac{b}{2a})^2-(\frac{c}{a}))=0
$$

On doit maintenant atteindre la forme $\alpha^2-\beta^2$ on y est presque, nous avons déjà $\alpha^2 : (x+\frac{b}{2a})^2$.

Regroupons les termes en $\beta^2$.

$$
\iff (x+\frac{b}{2a})^2-((\frac{b}{2a})^2\boldsymbol{-}(\frac{c}{a}))=0
$$

Attention au changement de signe lorsqu'on a tout mis entre parenthèse.

Il est tant de simplifier $\beta^2$.

$$
\iff (x+\frac{b}{2a})^2-(\boldsymbol{(\frac{b^2}{4a^2})}-(\frac{c}{a}))=0
$$

on va mettre sur le même dénominateur le deux termes.

$$
\iff (x+\frac{b}{2a})^2-(\boldsymbol{(\frac{b^2}{4a^2})-(\frac{4c}{4a})})=0
$$

$$
\iff (x+\frac{b}{2a})^2-(\boldsymbol{(\frac{b^2}{4a^2})-(\frac{4ac}{4a^2})})=0
$$

$$
\iff (x+\frac{b}{2a})^2-(\boldsymbol{(\frac{b^2-4ac}{4a^2})})=0
$$

Or on sait que $(2)$ $\alpha^2-\beta^2=(\alpha-\beta)(\alpha+\beta) $.

On peut donc réécrire l'équation en facteurs:

$$
\iff [(x+\frac{b}{2a})-\sqrt{(\frac{b^2-4ac}{4a^2})}][(x+\frac{b}{2a})+\sqrt{(\frac{b^2-4ac}{4a^2})}]=0
$$

On va faire en sorte d'avoir le même dénominateur.

$$
\iff [(x+\frac{b}{2a})-(\frac{\sqrt{b^2-4ac}}{2a})][(x+\frac{b}{2a})+(\frac{\sqrt{b^2-4ac}}{2a})]=0
$$

Ceci signifie que soit le premier facteur est nul, soit le second facteur est nul.

**Premier Facteur : $x_1$**

$$
(x_1+\frac{b}{2a})-(\frac{\sqrt{b^2-4ac}}{2a}) = 0
$$

On va s'arranger pour mettre $x_1$ d'un seul côté de l'équation. Commençons par supprimer les parenthèses.

$$
x_1+\frac{b}{2a}-\frac{\sqrt{b^2-4ac}}{2a} = 0
$$

Gardons uniquement $x_1$ à gauche.

$$
x_1 = -\frac{b}{2a}+\frac{\sqrt{b^2-4ac}}{2a}
$$

Dénominateur commun

$$
x_1 = \frac{-b+\sqrt{b^2-4ac}}{2a}
$$

**Deuxième Facteur : $x_2$**

$$
(x_2+\frac{b}{2a})+(\frac{\sqrt{b^2-4ac}}{2a}) = 0
$$

On va s'arranger pour mettre $x_2$ d'un seul côté de l'équation. Commençons par supprimer les parenthèses.

$$
x_2+\frac{b}{2a}+\frac{\sqrt{b^2-4ac}}{2a} = 0
$$

Gardons uniquement $x_2$ à gauche.

$$
x_2 = -\frac{b}{2a}-\frac{\sqrt{b^2-4ac}}{2a}
$$

Dénominateur commun

$$
x_2 = \frac{-b-\sqrt{b^2-4ac}}{2a}
$$

**Solution générale**

Nous pouvons donc écrire:

$$
x=\frac{- b\pm\sqrt{b^2-4ac}}{2a}
$$

Posons: $\Delta = b^2 - 4 ac$ et nous obtenons

$$
x=\frac{- b\pm\sqrt{\Delta}}{2a}
$$

Bien entendu dans $\mathbb{R}$ seul les $\Delta$ positifs aurons des résultats réels.

| $\Delta$ | Signification pour les racines |
|--|--|
| $\Delta\gt0$ | Il existe deux racines $\mathbb{R}$ |
| $\Delta=0$ | Il existe une racine $\mathbb{R}$ |
| $\Delta\lt0$ | Il n'existe aucune racines $\mathbb{R}$ |


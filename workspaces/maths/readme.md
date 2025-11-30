# Maths

## Equation générale du second degré
*Equation générale permettant de trouver les zéros, si ils existent, d'une équation du second degré*

Dans l'équation générale du second degré:
$$
a x^2 + b x + c = 0
$$

Si $a\not=0$ il existe deux solutions a l'équation $a x^2 + b x + c = 0$ qui sont:
$$
x = \frac{-b \plusmn \sqrt{b^2-4ac} }{2a}
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

Comme l'équation comprend une racine carrée de $\Delta$, dans $\Reals: $  $\sqrt{\Delta}$ n'existe que si $\Delta$ est null ou positif.

$$
\sqrt{\Delta} \in \Reals \iff \Delta \ge 0 
$$

### Démonstration

Démonstration généralisée basée sur *Al-kwhârizmi* 780-850 dite de *complétion du carré*.

On sait qu'il y a une identité remarquable: $(\alpha+\beta)^2=\alpha^2+2\alpha\beta+\beta^2$
Et nous allons utiliser une astuce de calcul qui permet d'ajouter de part et d'autre de l'équation la même chose en garantissant que l'équation reste identique $A+B=C \implies A+B+D=C+D $

Nous allons faire en sorte de choisir $D$ tel que l'équation $a x^2 + b x + c = 0$ ressemble au produit remarquable $(\alpha+\beta)^2$ ce qui nous permettra de trouver les racines de l'équation facilement.

Soit 
$$
a x^2 + b x + c = 0
$$
où $a\not=0$

on peut écrire que
$$
a x^2 + b x + c = 0 \iff x^2+\frac{b}{a}x+\frac{c}{a}=0
$$
car $a\not=0$

on rajoute +D de part et d'autre de l'égalité en choisissant $D=(\frac{b}{2a})^2-(\frac{c}{a})$
$$
\iff x^2 + \frac{b}{a}x+\frac{c}{a} +(\frac{b}{2a})^2-(\frac{c}{a})=(\frac{b}{2a})^2-(\frac{c}{a})
$$

dans la partie gauche les $\frac{c}{a} - \frac{c}{a}$ s'annulent

$$
\iff x^2 + \frac{b}{a}x+(\frac{b}{2a})^2=(\frac{b}{2a})^2-(\frac{c}{a})
$$

Nous avons spécialement choisi $D=(\frac{b}{2a})^2-(\frac{c}{a})$ pour obtenir la forme $(\alpha+\beta)^2 = \alpha^2+2\alpha\beta+\beta^2$. On remarque que c'est le cas dans la partie de gauche avec $\alpha = x$ et avec $\beta = \frac{b}{2a}$

En effet $(x + \frac{b}{2a})^2=x^2+2x\frac{b}{2a}+(\frac{b}{2a})^2$

Nous pouvons donc écrire:
$$
\iff (x+\frac{b}{2a})^2=(\frac{b}{2a})^2-(\frac{c}{a})
$$

On va prendre la racine carré de chaque partie de l'équation. A partir de ce moment il y aura deux cas possibles car la partie de gauche portée au carré peut-être soit négative, soit positive. 

$$
\iff \sqrt{(x+\frac{b}{2a})^2}=\sqrt{(\frac{b}{2a})^2-(\frac{c}{a})}
$$

On peut donc simplifier la partie de gauche

$$
\iff x+\frac{b}{2a}=\sqrt{(\frac{b}{2a})^2-(\frac{c}{a})}
$$

Ensuite soustraire le terme $\frac{b}{2a}$ de chaque côté de l'équation

$$
\iff x+\frac{b}{2a}-\frac{b}{2a}=\sqrt{(\frac{b}{2a})^2-(\frac{c}{a})}-\frac{b}{2a}
$$

$$
\iff x=\sqrt{(\frac{b}{2a})^2-(\frac{c}{a})}-\frac{b}{2a}
$$

Nous utilisons la commutativité de l'addition pour déplacer le terme et simplifier l'écriture

$$
\iff x=-\frac{b}{2a}+\sqrt{(\frac{b}{2a})^2-(\frac{c}{a})}
$$

Nous allons effectuer le calcul sous la racine pour pouvoir le simplifier ensuite

$$
\iff x=-\frac{b}{2a}+\sqrt{\frac{b^2}{4a^2}-\frac{c}{a}}
$$

Nous allons sous la racine mettre tout au même dénominateur: $4a^2$

$$
\iff x=-\frac{b}{2a}+\sqrt{\frac{b^2-4ac}{4a^2}}
$$

On sait que $\sqrt{4a^2} = 2a$

$$
\iff x=-\frac{b}{2a}+\frac{\sqrt{b^2-4ac}}{2a}
$$

Nous allons tout mettre au même dénominateur: $2a$

$$
\iff x=\frac{-b+\sqrt{b^2-4ac}}{2a}
$$

Précédemment nous avions assumé que prendre la racine carrée d'un nombre au carré nous faisait perdre l'information liée au signe du nombre.

Nous venons donc de trouver une des possibilités dans le cadre ou le nombre était positif.

En réalité nous venons de décrire le cas:

$$
x_1=\frac{- b+\sqrt{b^2-4ac}}{2a}
$$

Il reste le cas $x_2$

Nous avons pris le cas positif

$$
\iff (x+\frac{b}{2a})^2=(\frac{b}{2a})^2-(\frac{c}{a})
$$

$$
\iff \sqrt{(x_1+\frac{b}{2a})^2}=\sqrt{(\frac{b}{2a})^2-(\frac{c}{a})}
$$

Prenons maintenant le cas négatif
$$
\iff \boldsymbol{-}\sqrt{(\boldsymbol{x_2}+\frac{b}{2a})^2}=\sqrt{(\frac{b}{2a})^2-(\frac{c}{a})}
$$

Que nous pouvons réécrire
$$
\iff \sqrt{(x_2+\frac{b}{2a})^2}=\boldsymbol{-}\sqrt{(\frac{b}{2a})^2-(\frac{c}{a})}
$$

Le reste est similaire et nous arrivons à l'équation:

$$
x_2=\frac{- b-\sqrt{b^2-4ac}}{2a}
$$

On peut donc écrire 

$$
x=\frac{- b\pm\sqrt{b^2-4ac}}{2a}
$$


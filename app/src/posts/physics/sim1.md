---
title: 'How Maths models Movement: Physics Engine Tutorial 1'
date: '14/4/2023'
cover_image: 'images/posts/physics/sim1_cover.png'
tags: ['physics', 'simulation', 'tutorial']
excerpt: "We'll review the maths needed to simulate physically accurate movement."
---

In the last post, we set up a simple Raylib application to allow us to view the simulation we were going to make. Today, let's look at all the maths and physics needed to make said simulation. Without further ado, let's get started!

## Maths

Before we start coding, there are some maths and physics concepts one must know to make a physics engine. I'll try to explain things as they appear, and I'll use this post to explain quite some concepts in one go. However, I'm assuming you have an understanding of algebra, trigonometry and calculus. I will also give a refresher on linear algebra, but it won't be enough to fully understand it. If you're not comfortable with any of these topics, go study it and come back afterwards.

### A note on the notation

The notation used throughout this series of posts will be pretty much standard, although I have made some uncommon choices. So, to avoid confusion, I'll just state the notation used for everything.

Scalars are denoted as an italic Latin or Greek letter: $x, y, T, \theta, \alpha$. Functions are denoted in the same way, with a variable (or more, if necessary) in between parentheses: $x(t), \rho(x,y,t)$. However, the variable will commonly be omitted for functions of time. Vectors are denoted as a bold lowercase Latin or Greek letter: $\mathbf{r}, \mathbf{v}$. A subscript of $x$ or $y$ is used to denote a component of a vector: $\mathbf{r}_x, \mathbf{r}_y$. Other subscripts are used to distinguish between different vectors, for instance the position of objects $a$ and $b$: $\mathbf{r}_a, \mathbf{r}_b$. The magnitude of a vector is denoted by enclosing the vector in two vertical bars: $\lVert\mathbf{r}\rVert$. Normalized/unit vectors are denoted with a hat: $\mathbf{\widehat{r}}$. Matrices are denoted as a bold uppercase Latin or Greek letter: $\mathbf{M}, \mathbf{I}$. Subscripts represent the components of the matrix, like indexes in array notation (but without the brackets): $\mathbf{M}_{00}, \mathbf{M}_{ij}$. An uppercase delta before a variable represents a change in its value: $\Delta x, \Delta\mathbf{r}$. Derivatives are denoted with Leibniz notation: $\frac{dx}{dt}, \frac{d^2\mathbf{r}}{dt^2}$. Additionally, derivatives with respect to time can also be denoted using Newton's notation, where the number of dots represents the order of the derivative: $\dot{x}, \ddot{\mathbf{r}}$.

### Linear algebra

Linear algebra is all about vectors, which are ordered lists of numbers. As well be working in two dimensions, our vectors will have two numbers. We can define a vector and give it some coordinates:
$$\mathbf{a}=\begin{bmatrix}2 \\ 0\end{bmatrix}$$

These coordinates can be thought of in two ways. Either it is a point in space (imagine starting at the origin, and moving 2 units right and 0 units up: the point where you end up is the point corresponding to this vector) or a direction (imagine the direction from the origin to the previous point, like an arrow from one to the other). Like with normal numbers (usually called _scalars_ in linear algebra), there is a variety of operations that can be performed on vectors.

**Addition** is very straight-forward, it's just a matter of adding every component:
$$\mathbf{a}+\mathbf{b}=\begin{bmatrix}\mathbf{a}_x \\ \mathbf{a}_y\end{bmatrix} + \begin{bmatrix}\mathbf{b}_x \\ \mathbf{b}_y\end{bmatrix}=\begin{bmatrix}\mathbf{a}_x+\mathbf{b}_x \\ \mathbf{a}_y+\mathbf{b}_y\end{bmatrix}$$

**Negation** is just as easy:
$$-\mathbf{a}=\begin{bmatrix}-\mathbf{a}_x \\ -\mathbf{a}_y\end{bmatrix}$$

From these, **subtraction** is easily derived:
$$\mathbf{a}-\mathbf{b}=\mathbf{a}+(-\mathbf{b})=\begin{bmatrix}\mathbf{a}_x \\ \mathbf{a}_y\end{bmatrix} + \begin{bmatrix}-\mathbf{b}_x \\ -\mathbf{b}_y\end{bmatrix}=\begin{bmatrix}\mathbf{a}_x-\mathbf{b}_x \\ \mathbf{a}_y-\mathbf{b}_y\end{bmatrix}$$

**Multiplication** is not as easy though, because there are actually **4** ways of multiplying vectors. Firstly, it is possible to multiply a scalar by a vector. This is called **scalar multiplication**. Before you look at the formula, it is a good exercise to try and find it by logic. As mentioned previously, negating a vector is the same as negating each of its components. If you know your algebra, you might recall negation is the same as multiplication by -1, thus you already know what happens when you multiply by -1. Can you guess what happens when you multiply by other numbers? Anyway, here's the formula:
$$s\mathbf{a}=\begin{bmatrix}s\mathbf{a}_x \\ s\mathbf{a}_y\end{bmatrix}$$

> On a side note, multiplication by a scalar has the effect of scaling a vector, while keeping its direction intact. That's why numbers are called scalars in the first place. For instance, multiplying by 2 effectively doubles the length of a vector. And using Pythagoras's Theorem, it is possible to calculate the length of a vector (that is, if the bases are orthogonal, which they usually are):
> $$\lVert\mathbf{a}\rVert=\sqrt{\mathbf{a}_x^2+\mathbf{a}_y^2}$$
> Also, just as we can multiply by a scalar, we can also divide using simple algebra:
> $$\mathbf{a}/s=\frac{1}{s}\mathbf{a}=\begin{bmatrix}\mathbf{a}_x/s \\ \mathbf{a}_y/s\end{bmatrix}$$
> At last, the reason for this side note appears! If you divide a vector by its length (remember, that means you're scaling it down by its own length), it will end up with a length of 1 (don’t just take my word for it – try to prove, either geometrically or algebraically, that this is true). This very useful operation is called normalization, and the result is a normalized or unit vector.
> $$\mathbf{\widehat{a}}=\frac{\mathbf{a}}{\lVert\mathbf{a}\rVert}$$

Furthermore, there are 3 ways to multiply two vectors together. The easiest, albeit least useful, is the **component-wise product** or **Hadamard product**. Component-wise means the operation is applied to each component individually (so addition, negation and subtraction are all component-wise operations):
$$\mathbf{a}\odot\mathbf{b}=\begin{bmatrix}\mathbf{a}_x \\ \mathbf{a}_y\end{bmatrix} \odot \begin{bmatrix}\mathbf{b}_x \\ \mathbf{b}_y\end{bmatrix}=\begin{bmatrix}\mathbf{a}_x\mathbf{b}_x \\ \mathbf{a}_y\mathbf{b}_y\end{bmatrix}$$

The notation I'm using is just a matter of personal preference, as far as I'm aware there isn't a standard notation for this.

Much more useful is the **dot product** or **inner product** or **scalar product**. This has the peculiar property of producing a scalar from two vectors (thus scalar product), which represents how much a vector points in the direction of another one.

$$\mathbf{a}\cdot\mathbf{b}=\mathbf{a}_x\mathbf{b}_x+\mathbf{a}_y\mathbf{b}_y=\lVert\mathbf{a}\rVert\lVert\mathbf{b}\rVert\cos{\theta}$$

That last formula is very interesting. It says the dot product of two vectors is the product of their lengths and the cosine of the angle $\theta$ between them. Thus, if we have two normalized vectors $\mathbf{\widehat{a}}$ and $\mathbf{\widehat{b}}$, the cosine of the angle between them is equal to their dot product. This fact is exploited a lot in simulations (and even more in computer graphics), because a dot product is much faster to compute than a cosine.

The final product is the **cross product** or **outer product** or **vector product**. This one is very useful in three dimensions (where it is used to compute a vector perpendicular to two others), but not so much in two, where it is very similar to the dot product:
$$\mathbf{a}\times\mathbf{b}=\mathbf{a}_x\mathbf{b}_x-\mathbf{a}_y\mathbf{b}_y=\lVert\mathbf{a}\rVert\lVert\mathbf{b}\rVert\sin{\theta}$$

Finally, from component-wise multiplication it is possible to deduce **component-wise division**, although in practice I have never seen it being used.
$$\mathbf{a}\oslash\mathbf{b}=\begin{bmatrix}\mathbf{a}_x \\ \mathbf{a}_y\end{bmatrix} \oslash \begin{bmatrix}\mathbf{b}_x \\ \mathbf{b}_y\end{bmatrix}=\begin{bmatrix}\mathbf{a}_x/\mathbf{b}_x \\ \mathbf{a}_y/\mathbf{b}_y\end{bmatrix}$$

Once again, the notation is arbitrarily chosen. Although there isn't a need to use different symbols for scalar and component-wise division, as it can be inferred from the denominator, I find it better to clearly distinguish them.

## Physics

We're done with the (not at all) boring stuff. Let's get to the real thing: physics. In a physics simulation, we're usually most concerned with simulating the movement of bodies. At first, we'll start by simulating what physicists like to call point-masses: infinitely tiny points with a given mass. Usually, they're also called **particles**, and that's what we'll call them. These are really easy to simulate, because they don't have rotation or size, which massively simplifies maths! Before moving on, we'll also figure out how to connect them to create more interesting behaviour. Then we'll start thinking about **rigid-bodies**. These are objects _with_ size and rotation in which deformations can be ignored (things like a table or a box). These are much harder to simulate, but we'll manage to do it! If we were to consider deformations, we'd have **soft-bodies**. Once again that's a major step up in complexity, and I'm not sure if I'll implement them. Finally, there are also fluids, which once again are very complex. So, now knowing what awaits us in the future, let's look at the maths behind particles!

### Newtonian mechanics

Firstly, to study the movement of bodies, it is necessary to devise a way to represent such movement in mathematical language. There is a fundamental property that is the basis of everything else: a body's position, represented by the vector $\mathbf{r}$. From this we can (literally) derive other quantities: the velocity and the acceleration.
$$\mathbf{v}=\mathbf{\dot{r}}$$
$$\mathbf{a}=\mathbf{\dot{v}}=\mathbf{\ddot{r}}$$

It is important to distinguish _velocity_ from _speed_. While they are used interchangeably in ordinary speaking, they are very different things in physics. _Velocity_ is a vector, with a direction and a magnitude. That magnitude is _speed_. Thus, a constant speed means a body moves at a constant pace, while a constant velocity means a body moves at a constant pace and always in the same direction.

Next, we can take a look at Newton's laws and equations, which will govern most of the movement in our engine. Newton formulated three laws that describe the behaviour of moving bodies.

**Law 1:** Every body continues in its state of rest, or of uniform motion in a straight line, unless it is compelled to change that state by forces impressed upon it.

**Law 2:** The change of motion of an object is equal to the force impressed; and is made in the direction of the straight line in which the force is impressed.

**Law 3:** To every action, there is always opposed an equal reaction; or, the mutual actions of two bodies upon each other are always equal, and directed to contrary parts.

_This is a translation of Newton's statements which were originally written in Latin in his book Principia Mathematica (according to [Wikipedia](https://en.wikipedia.org/wiki/Newton%27s_laws_of_motion))._

Let's analyze these laws further. The first law represents the concept of inertia. It might seem strange at first. It is obvious that a resting body will only move if it is made to move by some force, nothing moves _spontaneously_. (Note for the curious reader - Here the term spontaneously is used quite liberally. For example, one might say a human being does move spontaneously. And that would be somewhat right. Here I use spontaneously not as “of its own accord”, but as “without the action of any force”.) However, it seems weird to say that a moving body keeps moving. For instance, try rolling a pen on your table (I encourage you to try it before reading the explanation, and again afterwards - can you notice what happens to the pen as it moves?). It certainly stopped, seemingly against Newton's first law. Except, there _are_ forces acting on the pen. These are the _dynamic friction_ between it and the table, and the _air resistance_ or _drag_. In a truly force-less environment (which is actually impossible, even space isn’t completely force free), a rolling pen would keep rolling on and on, unless something stopped it.

The second law states that the change of motion is related to the force impressed. Here, change of motion refers to the derivative of **linear momentum**, and not of velocity. Linear momentum is given by the formula
$$\mathbf{p}=m\mathbf{v}$$

Given this, Newton's second law can be stated mathematically as
$$\mathbf{F}=\frac{d\mathbf{p}}{dt}=\frac{d}{dt}(m\mathbf{v})$$

Assuming mass is a constant (which it might not be), this can be simplified to the well known form
$$\mathbf{F}=m\mathbf{a}$$

This can be solved to find acceleration, which is what we'll need for a physics engine
$$\mathbf{a}=\frac{\mathbf{F}}{m}$$

Finally, the third law. In other words, it says that if a body, A, exerts a force on another body, B, then B also exerts a force on A, with the same magnitude and opposite direction. For example, imagine a book lying on a table. Due to gravity the book impresses a downwards force on the table's surface, that's its _weight_ (mind that weight and mass are different things). According to the third law, the table should exert an upwards force of equal magnitude on the book. And this is indeed what happens. Where the table not to exert a force, the book would deform it and go through it. The force exerted by the table is called the _normal reaction_, because it is a reaction force along the direction of the surface's normal.

Now we have the foundations of any particle based simulation: we can compute appropriate forces (respecting the third law), apply them to objects, updating their acceleration (according to the second law), and use the acceleration to compute new velocity and position vectors. Although we already have all the maths to do this, let's take a look at that last step.

### Integration

The main task of a physics engine is to accurately update the positions of simulated objects. We know how we can compute acceleration, but how can we use it to find position? Acceleration _is_ related to position by the following equation:
$$\mathbf{a}=\mathbf{\ddot{r}}$$

Or, in a more suggestive notation,
$$\frac{d^2\mathbf{r}}{dt^2}=\mathbf{a}$$

For a moment, let's assume $\mathbf{a}$ is constant (we'll come back to this later). If we integrate both sides once, we get the following:
$$\int{\frac{d^2\mathbf{r}}{dt^2}dt}=\int{\mathbf{a}\,dt}\Leftrightarrow$$
$$\frac{d\mathbf{r}}{dt}=\mathbf{a}t+C$$

This is a formula for velocity (which is the first derivative of position). In this context, the constant of integration is the initial velocity.
$$\frac{d\mathbf{r}}{dt}=\mathbf{a}t+\mathbf{v}_0$$

Integrating again we finally get a formula for position, where once more the constant of integration is the initial position.
$$\int{\frac{d\mathbf{r}}{dt}dt}=\int{\mathbf{a}t+\mathbf{v}_0\,dt}\Leftrightarrow$$
$$\mathbf{r}=\frac{1}{2}\mathbf{a}t^2+\mathbf{v}t+\mathbf{r}_0$$

These two formulae are perfect for constant acceleration. However, things get harder when acceleration isn't constant, because it's impossible to integrate an arbitrary function analytically. As such, some approximations have to be made. For this explanation, let's focus only on calculating velocity (the same logic can be applied to position). The above formula worked for constant acceleration. So, we need to somehow recreate constant acceleration. First, let $\mathbf{v}_0$ be the initial velocity. Then, over a small interval $\Delta t$, assume acceleration is constant and use the previous formula to calculate
$$\mathbf{v}_1=\mathbf{a}\Delta t+\mathbf{v}_0$$

Then, update the acceleration to its new value, whatever it might be. Once again, let it be constant over a small interval and calculate $\mathbf{v}_2$. Generalizing, given you now the initial velocity, you can iteratively compute the velocity at any time step using this method:
$$\mathbf{v}_{n+1}=\mathbf{a}\Delta t+\mathbf{v}_n$$

This is one of many methods of **numerical integration**. The following animation explains it visually.

&&&vid[images/posts/physics/sim1_NumericalIntegration.mp4]
Approximating the acceleration in discrete steps.
&&&

## Conclusion

That was a lot to take in. If you didn't fully understand the maths involved, you might want to take a look at these series about [calculus](https://youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr) and [linear algebra](https://youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab). If you couldn't understand the physics itself, maybe read it again once or twice and let it all sink in. If you still don't understand, try finding some other resources out there, I'm sure there are plenty. Alternatively, if you have any questions, feel free to ask them in the brand new **comments section**! Anyway, on the next post we'll be going back to coding and implement all we discussed in this post, so keep your eyes peeled. Until then, goodbye!

---
title: Linear Time Invariant (LTI) Systems
topics: >-
  What is LTI System?, Mathematical Expression, Signal Transfer in LTI System,
  Properties
slug: linear-time-invariant-system-lti
category: Communication Systems
image: /placeholder.png
tags: 'analog communication, system, signals, electronics'
content: >
  ![LTI System Image](/blogs/LTI_System/lti.jpeg)

  ## [Introduction](#what-is-lti-system?) {#what-is-lti-system?}

  Basic properties, namely linear and time invariance, are vital in analyzing
  signals and systems. A linear and time-invariant system is known as an LTI
  system. An LTI system is characterized by its impulse response, and the
  complete characterization of any LTI system in terms of its impulse response
  is performed by convolution integral in the continuous time case and by
  convolution sum in the discrete-time case.

  #### [](#mathematical-expression) {#mathematical-expression}

  Convolution between two signals $$x_1(t)$$ and $$x_2(t)$$ is defined as, <br> 


  $$

  y(t) = x_1(t) * x_2(t) = \int_{-\infty}^{\infty} x_1(z) *x_2(t-z) \,dz

  $$ 


  where, **\*** is the symbol of convolution

  <br><br>

  In discrete time, <br>

  $$

  y[n] = \sum_{k=-\infty}^{\infty} x_1[k] *x_2[n-k]

  $$


  ## [Signal Transfer](#signal-transfer-in-lti-system)
  {#signal-transfer-in-lti-system}

    <img src="/blogs/LTI_System/signal_transfer_in_lti_system_dark.svg" media="(prefers-color-scheme: dark)">
    <img src="/blogs/LTI_System/signal_transfer_in_lti_system_light.svg" alt="Signal Transfer" media="(prefers-color-scheme: light)">


  #### [ ]()


  We have defined that an impulse response $h(t)$ is the output of the system
  for  $\delta(t)$ as input

  $$

  ie: h(t) = \phi \, \delta(t)

  $$

  Now, we can express $x(t)$ in terms of $\delta(t)$ as :-

  $$

  x(t) = \int_{-\infty}^{\infty} x(z)\, \delta(t-z) \, dz

  $$

  Now,

  $$

  y(t) = \phi\,[x(t)]

  $$

  $$

  = \phi \int_{-\infty}^{\infty} x(z)\, \delta(t-z) \, dz

  $$

  $$

  = \int_{-\infty}^{\infty} x(z)\, \phi\,  \delta(t-z) \, dz

  $$

  $$

  = \int_{-\infty}^{\infty} x(z)\, h(t-z) \, dz

  $$

  where, $$h(t) = \phi\, \delta(t)$$

  <br><br>

  **Therefore,**

  $$

  y(t) = \int_{-\infty}^{\infty} x(z)\, h(t-z) \, dz

  $$

  <br><br>

  **OR,**

  $$

  y(t) = x(t) * h(t)

  $$


  ## [Properties](#properties) {#properties}

  - The output of the LTI system is the convolution sum of its input and the
  impulse response.

  - **Commutative Property:** $$x(t) * h(t) = h(t) * x(t)$$

  - **Distributive Property:** $$x(t) * [h_1(t) + h_2(t)] = x(t)*h_1(t) +
  x(t)*h_2(t)$$

  - **Associative Property:** $$x(t) * [h_1(t) * h_2(t)] = [x(t) * h_1(t)] *
  h_2(t)$$


  #### Memory and Memoryless LTI system:

  In the memory LTI system, the output depends on present and past input and
  output values,

  $$

  Y(t) = X(t) + Y(t-1)

  $$

  In a memoryless LTI system, the output depends only on the present input,

  $$

  Y(t) = X(t)

  $$
createdAt: '2024-10-12T10:54:00.445Z'
timeToRead: '8'
preview: >-
  A system that is both linear and time-invariant is known as a Linear Time
  Invariant (LTI) System. An LTI system is characterized ...
---
![LTI System Image](/blogs/LTI_System/lti.jpeg)
## [Introduction](#what-is-lti-system?) {#what-is-lti-system?}
Basic properties, namely linear and time invariance, are vital in analyzing signals and systems. A linear and time-invariant system is known as an LTI system. An LTI system is characterized by its impulse response, and the complete characterization of any LTI system in terms of its impulse response is performed by convolution integral in the continuous time case and by convolution sum in the discrete-time case.
#### [](#mathematical-expression) {#mathematical-expression}
Convolution between two signals $$x_1(t)$$ and $$x_2(t)$$ is defined as, <br> 

$$
y(t) = x_1(t) * x_2(t) = \int_{-\infty}^{\infty} x_1(z) *x_2(t-z) \,dz
$$ 

where, **\*** is the symbol of convolution
<br><br>
In discrete time, <br>
$$
y[n] = \sum_{k=-\infty}^{\infty} x_1[k] *x_2[n-k]
$$

## [Signal Transfer](#signal-transfer-in-lti-system) {#signal-transfer-in-lti-system}

  <img src="/blogs/LTI_System/signal_transfer_in_lti_system_dark.svg" media="(prefers-color-scheme: dark)">
  <img src="/blogs/LTI_System/signal_transfer_in_lti_system_light.svg" alt="Signal Transfer" media="(prefers-color-scheme: light)">


#### [ ]()

We have defined that an impulse response $h(t)$ is the output of the system for  $\delta(t)$ as input
$$
ie: h(t) = \phi \, \delta(t)
$$
Now, we can express $x(t)$ in terms of $\delta(t)$ as :-
$$
x(t) = \int_{-\infty}^{\infty} x(z)\, \delta(t-z) \, dz
$$
Now,
$$
y(t) = \phi\,[x(t)]
$$
$$
= \phi \int_{-\infty}^{\infty} x(z)\, \delta(t-z) \, dz
$$
$$
= \int_{-\infty}^{\infty} x(z)\, \phi\,  \delta(t-z) \, dz
$$
$$
= \int_{-\infty}^{\infty} x(z)\, h(t-z) \, dz
$$
where, $$h(t) = \phi\, \delta(t)$$
<br><br>
**Therefore,**
$$
y(t) = \int_{-\infty}^{\infty} x(z)\, h(t-z) \, dz
$$
<br><br>
**OR,**
$$
y(t) = x(t) * h(t)
$$

## [Properties](#properties) {#properties}
- The output of the LTI system is the convolution sum of its input and the impulse response.
- **Commutative Property:** $$x(t) * h(t) = h(t) * x(t)$$
- **Distributive Property:** $$x(t) * [h_1(t) + h_2(t)] = x(t)*h_1(t) + x(t)*h_2(t)$$
- **Associative Property:** $$x(t) * [h_1(t) * h_2(t)] = [x(t) * h_1(t)] * h_2(t)$$

#### Memory and Memoryless LTI system:
In the memory LTI system, the output depends on present and past input and output values,
$$
Y(t) = X(t) + Y(t-1)
$$
In a memoryless LTI system, the output depends only on the present input,
$$
Y(t) = X(t)
$$

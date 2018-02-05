# Will it blend?

*by [Martin Sivák](https://github.com/MarSik)*

## Kubernets internals

Allocated res part of the **pod** spec

free = TOTAL - SUM(Spec)

## OpenStack internal

## oVirt internal

## Algorithm of all architecture

Filter > Map > Reduce

### Filter

select nodes based on constraint pre-defined in your spec
based on:
- cpu
- ram
- network
- storage

For exemple: if you have critical acticity such as payment, you must specify rules that protect from that

### Map

score

50% of energy budget of a data center is cooling ==> try to turn not used devices and groupd VM on computer that can shutdown.

CPU vs Memory score
...

Then normalize score, different on every company

### Reduce

Select best node



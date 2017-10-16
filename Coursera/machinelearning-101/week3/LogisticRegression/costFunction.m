function J = costFunction(X, y, theta)

n = length(y);
J = 0;

sum = 0;
for i = 1:n
  x = X(i,:)';
  prediction = 1/(1+e^-(theta'*x));
  sum = sum + (y(i) * log(prediction)) + ((1-y(i)) * log(1-prediction));
endfor
J = -1/n * sum;

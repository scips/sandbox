function [J, grad] = costFunctionReg(theta, X, y, lambda)
%COSTFUNCTIONREG Compute cost and gradient for logistic regression with regularization
%   J = COSTFUNCTIONREG(theta, X, y, lambda) computes the cost of using
%   theta as the parameter for regularized logistic regression and the
%   gradient of the cost w.r.t. to the parameters.

% Initialize some useful values
m = length(y); % number of training examples

% You need to return the following variables correctly
J = 0;
grad = zeros(size(theta));

% ====================== YOUR CODE HERE ======================
% Instructions: Compute the cost of a particular choice of theta.
%               You should set J to the cost.
%               Compute the partial derivatives and set grad to the partial
%               derivatives of the cost w.r.t. each parameter in theta


sum_theta_2 = 0;

% do not index theta0 (j == 1)
for j = 1:length(theta)
    if j > 1
        sum_theta_2 = sum_theta_2 + theta(j)^2;
    endif
    sum = 0;
    for i = 1:m
        x = X(i,:)';
        term = (sigmoid(theta'*x)-y(i))*X(i,j);
        sum = sum + term;
    endfor
    if j == 1
        grad(j) = sum/m;
    else
        grad(j) = sum/m + lambda/m*theta(j);
    endif
endfor

sum = 0;
for i = 1:m
  x = X(i,:)';
  prediction = sigmoid(theta'*x);
  sum = sum + (y(i) * log(prediction)) + ((1-y(i)) * log(1-prediction));
endfor
J = -1/m * sum + lambda/(2*m)*sum_theta_2;


% =============================================================

end

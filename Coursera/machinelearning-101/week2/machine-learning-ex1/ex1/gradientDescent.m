function [theta, J_history] = gradientDescent(X, y, theta, alpha, num_iters)
%GRADIENTDESCENT Performs gradient descent to learn theta
%   theta = GRADIENTDESCENT(X, y, theta, alpha, num_iters) updates theta by
%   taking num_iters gradient steps with learning rate alpha

% Initialize some useful values
m = length(y); % number of training examples
J_history = zeros(num_iters, 1);
number_of_thetas = size(X)(2);

for iter = 1:num_iters

    % ====================== YOUR CODE HERE ======================
    % Instructions: Perform a single gradient step on the parameter vector
    %               theta.
    %
    % Hint: While debugging, it can be useful to print out the values
    %       of the cost function (computeCost) and gradient here.
    %


    costJ = computeCost(X, y, theta);
    % disp(iter),disp(costJ);

    term1 = X * theta - y;
    alpha_m = alpha/m;

    for j = 1:number_of_thetas
        theta(j) = theta(j) - alpha_m * sum(term1 .* X(:,j));
    endfor

    % theta(1) = theta(1) - alpha/m * sum(term1 .* x1);
    % theta(2) = theta(2) - alpha/m * sum(term1 .* x2);

    % disp(theta);


    % ============================================================

    % Save the cost J in every iteration
    J_history(iter) = costJ;

end

end

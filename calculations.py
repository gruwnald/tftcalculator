import numpy as np

c = {1: [1, 0, 0, 0, 0], 2: [1, 0, 0, 0, 0], 3: [0.75, 0.25, 0, 0, 0], 4: [0.55, 0.30, 0.15, 0, 0],
        5: [0.45, 0.33, 0.20, 0.02, 0], 6: [0.25, 0.40, 0.30, 0.05, 0], 7: [0.19, 0.30, 0.35, 0.15, 0.01],
        8: [0.15, 0.20, 0.35, 0.25, 0.05], 9: [0.10, 0.15, 0.30, 0.30, 0.15], 10: [0.05, 0.10, 0.20, 0.40, 0.25],
        11: [0.01, 0.01, 0.12, 0.50, 0.35]}

d = {1:29, 2:22, 3:18, 4:12, 5:10}

f = {1:13, 2:13, 3:13, 4:12, 5:8}

def probabilityCalculator(a, b, l, e, g, j):
    transition_matrix = np.zeros((10, 10))
    for i in range(9):
        p = c[l][e-1]*(d[e]-(a+i))/(d[e]*f[e]-(b+i))
        transition_matrix[i][i] = 1 - p
        transition_matrix[i][i+1] = p
    transition_matrix[9][9] = 1
    n = g - j*e
    n //= 2
    n *= 5
    transition_matrix = np.linalg.matrix_power(transition_matrix, 130)
    return transition_matrix[0][j]

a = 3
b = 25
e = 4
l = 8
g = 60

s = 0
for j in range(10):
    s += probabilityCalculator(a, b, l, e, g, j)
    print(f'{j}: {probabilityCalculator(a, b, l, e, g, j)}')
print(s)


    


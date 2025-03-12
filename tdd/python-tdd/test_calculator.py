import unittest
from calculator import Calculator  # This module doesn't exist yet.

class TestCalculator(unittest.TestCase):
    def test_add(self):
        calc = Calculator()
        result = calc.add(2, 3)
        self.assertEqual(result, 5)  # Expected 2 + 3 = 5

    def test_subtract(self):
        calc = Calculator()
        result = calc.subtract(5, 3)
        self.assertEqual(result, 2)  # Expected 5 - 3 = 2

    def test_multiply(self):
        calc = Calculator()
        result = calc.multiply(4, 3)
        self.assertEqual(result, 12)  # Expected 4 * 3 = 12

    def test_divide(self):
        calc = Calculator()
        result = calc.divide(10, 2)
        self.assertEqual(result, 5)  # Expected 10 / 2 = 5

        with self.assertRaises(ZeroDivisionError):
            calc.divide(10, 0)  # Dividing by zero should raise an error.

if __name__ == "__main__":
    unittest.main()

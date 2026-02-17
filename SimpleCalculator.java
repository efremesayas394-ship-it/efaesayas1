package simplecalculatorjava;
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class SimpleCalculator extends JFrame implements ActionListener {
    JLabel lblNum1;
    JLabel lblNum2;
    JLabel lblResult;
    JTextField txtNum1;
    JTextField txtNum2;
    JTextField txtResult;

    JButton[] numButtons = new JButton[10];
    JButton add;
    JButton sub;
    JButton mul;
    JButton div;
    JButton clr;
    JButton eq;
    JPanel panelNumbers;
    JPanel panelOps;
    JTextField activeField;

    public SimpleCalculator() {
        setTitle("Simple Calculator");
        setSize(400, 500);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout(10, 10));

        JPanel topPanel = new JPanel(new GridLayout(3, 2, 10, 10));

        lblNum1 = new JLabel("Num1:");
        lblNum2 = new JLabel("Num2:");
        lblResult = new JLabel("Result:");

        txtNum1 = new JTextField();
        txtNum2 = new JTextField();
        txtResult = new JTextField();
        txtResult.setEditable(false);

        txtNum1.addMouseListener(new MouseAdapter() {
            public void mouseClicked(MouseEvent e) {
                activeField = txtNum1;
            }
        });
        txtNum2.addMouseListener(new MouseAdapter() {
            public void mouseClicked(MouseEvent e) {
                activeField = txtNum2;
            }
        });

        topPanel.add(lblNum1);
        topPanel.add(txtNum1);
        topPanel.add(lblNum2);
        topPanel.add(txtNum2);
        topPanel.add(lblResult);
        topPanel.add(txtResult);

        add(topPanel, BorderLayout.NORTH);

        panelNumbers = new JPanel(new GridLayout(4, 3, 10, 10));

        for (int i = 1; i <= 9; i++) {
            numButtons[i] = new JButton(String.valueOf(i));
            numButtons[i].setFont(new Font("Arial", Font.BOLD, 22));
            numButtons[i].addActionListener(this);
            panelNumbers.add(numButtons[i]);
        }

        numButtons[0] = new JButton("0");
        numButtons[0].setFont(new Font("Arial", Font.BOLD, 22));
        numButtons[0].addActionListener(this);

        clr = new JButton("C");
        clr.setFont(new Font("Arial", Font.BOLD, 22));
        clr.addActionListener(this);

        eq = new JButton("=");
        eq.setFont(new Font("Arial", Font.BOLD, 22));
        eq.addActionListener(this);

        panelNumbers.add(numButtons[0]);
        panelNumbers.add(clr);
        panelNumbers.add(eq);

        add(panelNumbers, BorderLayout.CENTER);

        panelOps = new JPanel(new GridLayout(1, 4, 10, 10));

        add = new JButton("+");
        sub = new JButton("-");
        mul = new JButton("*");
        div = new JButton("/");

        JButton[] ops = { add, sub, mul, div };
        for (JButton b : ops) {
            b.setFont(new Font("Arial", Font.BOLD, 22));
            b.addActionListener(this);
            panelOps.add(b);
        }

        add(panelOps, BorderLayout.SOUTH);

        setVisible(true);
    }

    public void actionPerformed(ActionEvent e) {
        Object src = e.getSource();

        for (int i = 0; i <= 9; i++) {
            if (src == numButtons[i] && activeField != null) {
                activeField.setText(activeField.getText() + i);
                return;
            }
        }

        if (src == clr) {
            txtNum1.setText("");
            txtNum2.setText("");
            txtResult.setText("");
            activeField = null;
            return;
        }

        try {
            double num1 = Double.parseDouble(txtNum1.getText());
            double num2 = Double.parseDouble(txtNum2.getText());
            double result = 0;

if (src == add) result = num1 + num2;
            else if (src == sub) result = num1 - num2;
            else if (src == mul) result = num1 * num2;
            else if (src == div) {
                if (num2 == 0) throw new ArithmeticException("Divide by zero!");
                result = num1 / num2;
            } else if (src == eq) {
                result = Double.parseDouble(txtResult.getText());
            }

            txtResult.setText(String.valueOf(result));

        } catch (NumberFormatException ex) {
            JOptionPane.showMessageDialog(this, "Please enter valid numbers!");
        } catch (ArithmeticException ex) {
            JOptionPane.showMessageDialog(this, ex.getMessage());
        }
    }

    public static void main(String[] args) {
        new SimpleCalculator();
    }
}
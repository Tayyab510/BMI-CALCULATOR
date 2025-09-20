// BMI Calculator JavaScript
class BMICalculator {
    constructor() {
        this.form = document.getElementById('bmiForm');
        this.heightInput = document.getElementById('height');
        this.weightInput = document.getElementById('weight');
        this.resultSection = document.getElementById('resultSection');
        this.bmiValue = document.getElementById('bmiValue');
        this.categoryText = document.getElementById('categoryText');
        this.categoryDescription = document.getElementById('categoryDescription');
        this.resetBtn = document.getElementById('resetBtn');
        
        this.heightError = document.getElementById('heightError');
        this.weightError = document.getElementById('weightError');
        
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.resetBtn.addEventListener('click', () => this.resetCalculator());
        
        // Real-time validation
        this.heightInput.addEventListener('input', () => this.validateHeight());
        this.weightInput.addEventListener('input', () => this.validateWeight());
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        if (this.validateInputs()) {
            this.calculateBMI();
        }
    }
    
    validateInputs() {
        const height = parseFloat(this.heightInput.value);
        const weight = parseFloat(this.weightInput.value);
        
        let isValid = true;
        
        // Clear previous errors
        this.clearErrors();
        
        // Validate height
        if (!this.validateHeight()) {
            isValid = false;
        }
        
        // Validate weight
        if (!this.validateWeight()) {
            isValid = false;
        }
        
        return isValid;
    }
    
    validateHeight() {
        const height = parseFloat(this.heightInput.value);
        
        if (isNaN(height) || height <= 0) {
            this.showError(this.heightError, 'Please enter a valid height');
            return false;
        }
        
        if (height < 50 || height > 300) {
            this.showError(this.heightError, 'Height must be between 50 and 300 cm');
            return false;
        }
        
        this.clearError(this.heightError);
        return true;
    }
    
    validateWeight() {
        const weight = parseFloat(this.weightInput.value);
        
        if (isNaN(weight) || weight <= 0) {
            this.showError(this.weightError, 'Please enter a valid weight');
            return false;
        }
        
        if (weight < 10 || weight > 500) {
            this.showError(this.weightError, 'Weight must be between 10 and 500 kg');
            return false;
        }
        
        this.clearError(this.weightError);
        return true;
    }
    
    showError(errorElement, message) {
        errorElement.textContent = message;
        errorElement.style.color = '#e74c3c';
    }
    
    clearError(errorElement) {
        errorElement.textContent = '';
    }
    
    clearErrors() {
        this.clearError(this.heightError);
        this.clearError(this.weightError);
    }
    
    calculateBMI() {
        const height = parseFloat(this.heightInput.value);
        const weight = parseFloat(this.weightInput.value);
        
        // Convert height from cm to meters
        const heightInMeters = height / 100;
        
        // Calculate BMI: weight (kg) / height (m)²
        const bmi = weight / (heightInMeters * heightInMeters);
        
        // Round to 1 decimal place
        const roundedBMI = Math.round(bmi * 10) / 10;
        
        // Display result
        this.displayResult(roundedBMI);
    }
    
    displayResult(bmi) {
        // Show result section
        this.resultSection.style.display = 'block';
        
        // Animate BMI value
        this.animateValue(this.bmiValue, 0, bmi, 1000);
        
        // Get BMI category
        const category = this.getBMICategory(bmi);
        
        // Update category display
        this.categoryText.textContent = category.name;
        this.categoryDescription.textContent = category.description;
        
        // Update category styling
        this.updateCategoryStyling(category.type);
        
        // Highlight appropriate chart bar
        this.highlightChartBar(category.type);
        
        // Scroll to result
        this.resultSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    getBMICategory(bmi) {
        if (bmi < 18.5) {
            return {
                name: 'Underweight',
                description: 'You may need to gain weight. Consider consulting a healthcare provider for guidance on healthy weight gain.',
                type: 'underweight'
            };
        } else if (bmi >= 18.5 && bmi < 25) {
            return {
                name: 'Normal Weight',
                description: 'Great! You have a healthy weight for your height. Maintain your current lifestyle.',
                type: 'normal'
            };
        } else if (bmi >= 25 && bmi < 30) {
            return {
                name: 'Overweight',
                description: 'You may want to consider losing some weight. A balanced diet and regular exercise can help.',
                type: 'overweight'
            };
        } else {
            return {
                name: 'Obese',
                description: 'It\'s recommended to consult a healthcare provider for guidance on weight management.',
                type: 'obese'
            };
        }
    }
    
    updateCategoryStyling(type) {
        // Remove existing category classes
        const categoryElement = document.getElementById('bmiCategory');
        categoryElement.className = 'bmi-category';
        
        // Add new category class
        categoryElement.classList.add(type);
        
        // Update border color based on category
        const colors = {
            underweight: '#1976d2',
            normal: '#2e7d32',
            overweight: '#f57c00',
            obese: '#d32f2f'
        };
        
        categoryElement.style.borderLeftColor = colors[type];
    }
    
    highlightChartBar(type) {
        // Remove active class from all chart bars
        document.querySelectorAll('.chart-bar').forEach(bar => {
            bar.classList.remove('active');
        });
        
        // Add active class to current category
        const activeBar = document.querySelector(`.chart-bar.${type}`);
        if (activeBar) {
            activeBar.classList.add('active');
        }
    }
    
    animateValue(element, start, end, duration) {
        const startTime = performance.now();
        const range = end - start;
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const current = start + (range * easeOutCubic);
            
            element.textContent = current.toFixed(1);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    resetCalculator() {
        // Clear form
        this.form.reset();
        
        // Hide result section
        this.resultSection.style.display = 'none';
        
        // Clear errors
        this.clearErrors();
        
        // Reset category styling
        const categoryElement = document.getElementById('bmiCategory');
        categoryElement.className = 'bmi-category';
        categoryElement.style.borderLeftColor = '#667eea';
        
        // Remove active chart bar
        document.querySelectorAll('.chart-bar').forEach(bar => {
            bar.classList.remove('active');
        });
        
        // Focus on height input
        this.heightInput.focus();
    }
}

// Initialize the BMI Calculator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new BMICalculator();
});

// Add some helpful keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Enter key to calculate
    if (e.key === 'Enter' && !e.shiftKey) {
        const form = document.getElementById('bmiForm');
        if (form) {
            form.dispatchEvent(new Event('submit'));
        }
    }
    
    // Escape key to reset
    if (e.key === 'Escape') {
        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn && resetBtn.offsetParent !== null) {
            resetBtn.click();
        }
    }
});

#!/bin/bash

# 🔍 EduFun - Verification Checklist Script
# ============================================

echo "======================================"
echo "🔍 EduFun Project Verification"
echo "======================================"
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
PASSED=0
FAILED=0

# Function to check file exists
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} Found: $1"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} Missing: $1"
        ((FAILED++))
    fi
}

# Function to check directory exists
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} Found: $1/"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} Missing: $1/"
        ((FAILED++))
    fi
}

# Function to count lines in file
count_lines() {
    if [ -f "$1" ]; then
        lines=$(wc -l < "$1")
        echo "  Lines: $lines"
    fi
}

echo -e "${BLUE}📁 Checking Directory Structure...${NC}"
echo ""

# Frontend structure
echo "Frontend Structure:"
check_dir "frontend/src"
check_dir "frontend/src/pages"
check_dir "frontend/src/components"
check_dir "frontend/src/services"
check_dir "frontend/src/styles"
echo ""

echo -e "${BLUE}🎮 Checking Game Files...${NC}"
echo ""

check_file "frontend/src/pages/GameModes.jsx"
check_file "frontend/src/pages/MemoryGame.jsx"
check_file "frontend/src/pages/ColorMatch.jsx"
check_file "frontend/src/pages/CountingGame.jsx"
check_file "frontend/src/pages/AnimalGame.jsx"
check_file "frontend/src/pages/ShapeGame.jsx"
echo ""

echo -e "${BLUE}🤖 Checking AI Files...${NC}"
echo ""

check_file "frontend/src/pages/Chatbot.jsx"
check_file "frontend/src/services/aiService.js"
check_file "frontend/src/styles/chatbotStyles.css"
echo ""

echo -e "${BLUE}🎨 Checking CSS Files...${NC}"
echo ""

check_file "frontend/src/styles/gameStyles.css"
check_file "frontend/src/styles/homeStyles.css"
check_file "frontend/src/styles/dashboardStyles.css"
check_file "frontend/src/styles/navbarStyles.css"
echo ""

echo -e "${BLUE}📄 Checking Documentation...${NC}"
echo ""

check_file "QUICK_START.md"
check_file "SYSTEM_OVERVIEW.md"
check_file "INSTALLATION_GUIDE.md"
check_file "GAME_FEATURES.md"
check_file "DESIGN_SYSTEM.md"
check_file "TECHNICAL_SPECS.md"
check_file "CHATBOT_AI_GUIDE.md"
check_file "TESTING_GUIDE.md"
check_file "DEPLOYMENT.md"
check_file "IMPROVEMENTS_ROADMAP.md"
check_file "INDEX.md"
echo ""

echo -e "${BLUE}📊 File Statistics...${NC}"
echo ""

if [ -f "frontend/src/styles/gameStyles.css" ]; then
    echo "Game Styles:"
    count_lines "frontend/src/styles/gameStyles.css"
fi

if [ -f "frontend/src/styles/homeStyles.css" ]; then
    echo "Home Styles:"
    count_lines "frontend/src/styles/homeStyles.css"
fi

if [ -f "frontend/src/styles/chatbotStyles.css" ]; then
    echo "Chatbot Styles:"
    count_lines "frontend/src/styles/chatbotStyles.css"
fi

if [ -f "frontend/src/services/aiService.js" ]; then
    echo "AI Service:"
    count_lines "frontend/src/services/aiService.js"
fi

if [ -f "frontend/src/pages/Chatbot.jsx" ]; then
    echo "Chatbot Component:"
    count_lines "frontend/src/pages/Chatbot.jsx"
fi

echo ""

# Summary
echo "======================================"
echo -e "${BLUE}📊 Verification Summary${NC}"
echo "======================================"
echo -e "${GREEN}✓ Passed: $PASSED${NC}"
echo -e "${RED}✗ Failed: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 All checks passed!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. cd frontend"
    echo "2. npm install"
    echo "3. npm start"
    echo "4. Open http://localhost:3000"
    exit 0
else
    echo -e "${RED}⚠️  Some files are missing. Please check.${NC}"
    exit 1
fi

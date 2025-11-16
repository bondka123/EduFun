// 🤖 Service IA - Analyse et recommandations
// Simule une IA pour analyser les performances et donner des recommandations

class AIService {
  // Analyse les performances de l'enfant
  static analyzePerformance(gameData) {
    if (!gameData || gameData.length === 0) {
      return {
        totalGames: 0,
        totalScore: 0,
        averageScore: 0,
        successRate: 0,
        fastestResponse: null,
        slowestResponse: null,
        strengths: [],
        weaknesses: [],
        level: 'débutant'
      };
    }

    const totalGames = gameData.length;
    const totalScore = gameData.reduce((sum, g) => sum + (g.score || 0), 0);
    const averageScore = Math.round(totalScore / totalGames);
    const successGames = gameData.filter(g => g.score > 50).length;
    const successRate = Math.round((successGames / totalGames) * 100);

    // Analyser par type de jeu
    const gameStats = {};
    gameData.forEach(game => {
      if (!gameStats[game.type]) {
        gameStats[game.type] = { count: 0, totalScore: 0 };
      }
      gameStats[game.type].count++;
      gameStats[game.type].totalScore += game.score || 0;
    });

    // Identifier points forts et faibles
    const gamePerformance = Object.keys(gameStats).map(type => ({
      type,
      count: gameStats[type].count,
      average: Math.round(gameStats[type].totalScore / gameStats[type].count)
    }));

    const strengths = gamePerformance
      .filter(g => g.average >= 70)
      .map(g => g.type)
      .slice(0, 3);

    const weaknesses = gamePerformance
      .filter(g => g.average < 50)
      .map(g => g.type)
      .slice(0, 3);

    // Déterminer le niveau
    let level = 'débutant';
    if (successRate >= 70) level = 'intermédiaire';
    if (successRate >= 85) level = 'avancé';

    return {
      totalGames,
      totalScore,
      averageScore,
      successRate,
      strengths,
      weaknesses,
      level,
      gamePerformance
    };
  }

  // Générer des recommandations personnalisées
  static generateRecommendations(performance) {
    const recommendations = [];

    // Recommandation basée sur le taux de succès
    if (performance.successRate < 50) {
      recommendations.push({
        type: 'practice',
        priority: 'high',
        message: `Continue à pratiquer! Tu as réussi ${performance.successRate}% des jeux. Essaie d'être plus attentif.`,
        action: 'Reprendre les jeux faciles'
      });
    } else if (performance.successRate >= 85) {
      recommendations.push({
        type: 'challenge',
        priority: 'high',
        message: `Excellent travail! ${performance.successRate}% de réussite! Tu es prêt pour les défis difficiles.`,
        action: 'Essayer les jeux difficiles'
      });
    }

    // Recommandation basée sur les forces
    if (performance.strengths.length > 0) {
      recommendations.push({
        type: 'strength',
        priority: 'medium',
        message: `Tu excelles en: ${performance.strengths.join(', ')}! Continue comme ça!`,
        action: 'Continuer ces jeux'
      });
    }

    // Recommandation basée sur les faiblesses
    if (performance.weaknesses.length > 0) {
      recommendations.push({
        type: 'improvement',
        priority: 'high',
        message: `Tu as des difficultés en: ${performance.weaknesses.join(', ')}. Besoin d'aide?`,
        action: `Améliorer: ${performance.weaknesses[0]}`
      });
    }

    // Recommandation de variété
    if (performance.totalGames > 0 && Object.keys(performance.gamePerformance || {}).length < 3) {
      recommendations.push({
        type: 'variety',
        priority: 'low',
        message: 'Essaie d\'autres jeux pour découvrir de nouvelles compétences!',
        action: 'Explorer d\'autres jeux'
      });
    }

    return recommendations;
  }

  // Générer une explication pour une réponse
  static generateExplanation(gameType, isCorrect, context = {}) {
    const explanations = {
      memory: {
        correct: [
          'Bravo! Tu as une excellente mémoire! 🧠',
          'Parfait! Tu te souviens bien des positions! 💪',
          'Super! Tu progresses dans ton observation! ✨'
        ],
        incorrect: [
          'Pas grave! La mémoire s\'améliore en pratiquant. Réessaie! 🔄',
          'C\'est normal! Observe bien et réessaie plus tard. 👀',
          'Pas d\'inquiétude! Même les adultes font des erreurs! 😊'
        ]
      },
      colors: {
        correct: [
          'Excellent! Tu reconnais parfaitement les couleurs! 🎨',
          'Bravo! Tes yeux sont très attentifs! 👀',
          'Parfait! Tu apprends vite! 🌈'
        ],
        incorrect: [
          'Tu te trompes, mais ce n\'est pas grave! Les couleurs sont difficiles. 🌈',
          'Pas tout à fait! Regarde bien la teinte. Réessaie! 🔍',
          'Ce n\'est pas la bonne couleur. Concentre-toi! 💭'
        ]
      },
      counting: {
        correct: [
          'Excellent compteur! Tu comptes parfaitement! 🔢',
          'Bravo! Les mathématiques, c\'est ton point fort! 💯',
          'Parfait! Tu comptes très vite! ⚡'
        ],
        incorrect: [
          'Presque! Le comptage demande de la concentration. Réessaie! 🔄',
          'Pas tout à fait! Compte doucement et attentivement. 🐢',
          'Ce n\'est pas correct, mais tu apprendras! 📚'
        ]
      },
      animals: {
        correct: [
          'Génial! Tu connais bien les animaux! 🦁',
          'Excellent! Tu reconnais tous les bruits! 👂',
          'Bravo! Tu es un expert des animaux! 🐾'
        ],
        incorrect: [
          'C\'est pas le bon animal, mais il y a tant à apprendre! 🦁',
          'Tu te trompes! Le bruit était différent. Réécoute! 🔊',
          'Pas correct cette fois, mais tu amélioreras! 💪'
        ]
      },
      shapes: {
        correct: [
          'Parfait! Tu identifies bien les formes! 🔶',
          'Excellent! La géométrie, c\'est ton domaine! 📐',
          'Bravo! Tu es un expert des formes! ✨'
        ],
        incorrect: [
          'Pas tout à fait! Les formes sont fascinantes à apprendre! 🔷',
          'Ce n\'est pas la bonne forme. Regarde mieux! 👀',
          'Tu vas apprendre! La géométrie, c\'est progressif! 📚'
        ]
      }
    };

    const gameExplanations = explanations[gameType] || explanations.memory;
    const responseType = isCorrect ? 'correct' : 'incorrect';
    const messages = gameExplanations[responseType] || [];

    return messages[Math.floor(Math.random() * messages.length)];
  }

  // Suggérer le prochain jeu
  static suggestNextGame(performance, playedGames = []) {
    const allGames = ['memory', 'colors', 'counting', 'animals', 'shapes'];
    
    // Ne pas recommander les jeux récemment joués
    const availableGames = allGames.filter(g => !playedGames.includes(g));

    if (performance.successRate < 50) {
      // Débutant: jeu facile
      return availableGames.length > 0 
        ? availableGames[0] 
        : 'memory';
    } else if (performance.successRate >= 85) {
      // Avancé: jeu difficile
      return availableGames.length > 0 
        ? availableGames[availableGames.length - 1] 
        : 'shapes';
    } else {
      // Intermédiaire: jeu aléatoire
      return availableGames.length > 0 
        ? availableGames[Math.floor(Math.random() * availableGames.length)]
        : 'colors';
    }
  }

  // Répondre aux questions des enfants
  static answerQuestion(question) {
    const questionLower = question.toLowerCase();

    // Dictionnaire de réponses pédagogiques
    const answers = {
      // À propos des couleurs
      couleur: {
        keywords: ['couleur', 'color', 'rouge', 'bleu', 'vert', 'jaune', 'orange', 'rose'],
        response: `Les couleurs sont partout! 🌈 Il y a 6 couleurs principales:\n
- 🔴 Rouge (comme une pomme)\n
- 🔵 Bleu (comme le ciel)\n
- 🟡 Jaune (comme le soleil)\n
- 🟢 Vert (comme l'herbe)\n
- 🟠 Orange (comme une orange)\n
- 🩷 Rose (très joli!)\n\nEssaie le jeu des couleurs pour apprendre! 😊`
      },

      // À propos du comptage
      compter: {
        keywords: ['compter', 'nombre', 'count', 'combien', 'comment compter'],
        response: `Pour compter, c'est facile! 🔢\n\n1️⃣ Regarde les objets\n2️⃣ Pointe avec ton doigt\n3️⃣ Dis le nombre tout haut: 1, 2, 3...\n\nAu début, compte lentement. Avec la pratique, tu seras super rapide! ⚡\n\nEssaie le jeu de comptage! 🎯`
      },

      // À propos des formes
      forme: {
        keywords: ['forme', 'circle', 'carré', 'triangle', 'rectangle', 'étoile', 'cœur'],
        response: `Les formes sont dans le monde entier! 🔶\n\n- ⭕ Cercle (rond, comme une pizza)\n- 🔷 Carré (4 côtés égaux)\n- 🔺 Triangle (3 côtés pointus)\n- ⭐ Étoile (brille dans le ciel!)\n- ❤️ Cœur (l'amour! 💕)\n- ⬛ Rectangle (comme un gâteau)\n\nEssaie le jeu des formes! 😊`
      },

      // À propos des animaux
      animal: {
        keywords: ['animal', 'bruit', 'son', 'chat', 'chien', 'vache', 'canard', 'grenouille'],
        response: `Les animaux font des bruits différents! 🐾\n\n🐱 Chat: Miaou!\n🐶 Chien: Ouaf!\n🐄 Vache: Meuh!\n🦆 Canard: Coin coin!\n🐸 Grenouille: Coassement!\n🦁 Lion: Rugit!\n\nEssaie le jeu des animaux pour apprendre tous leurs cris! 🎮`
      },

      // À propos de la mémoire
      memoire: {
        keywords: ['mémoire', 'memory', 'oublier', 'se souvenir', 'pairs'],
        response: `La mémoire est un superpovoir! 🧠\n\nPour bien mémoriser:\n1️⃣ Regarde bien chaque carte\n2️⃣ Essaie de te souvenir de sa position\n3️⃣ Retourne deux cartes à la fois\n4️⃣ Si elles sont pareilles, tu as trouvé une paire! ✨\n\nPlus tu joues, mieux tu te souviens! 💪\nEssaie le jeu de mémoire! 🎴`
      },

      // À propos de la progression
      progression: {
        keywords: ['niveau', 'difficile', 'facile', 'progresser', 'next level'],
        response: `Tu vas progresser rapidement! 🚀\n\nVoici comment ça marche:\n🟢 FACILE: Commence par là! C'est pour s'échauffer.\n🟡 MOYEN: Plus compliqué, mais tu peux le faire!\n🔴 DIFFICILE: C'est pour les champions! 🏆\n\nChaque jeu augmente progressivement. Continue à jouer, tu apprendras vite! 📚`
      },

      // À propos des badges
      badge: {
        keywords: ['badge', 'récompense', 'trophée', 'achèvement', 'déverrouiller'],
        response: `Les badges sont tes récompenses! 🏆\n\n🌟 Quand tu réussis bien un jeu\n🎯 Tu déverrouilles un badge spécial\n💎 Plus tu joues, plus tu en gagnes!\n\nContinue à jouer pour tous les déverrouiller! Bravo champion! 🎉`
      },

      // À propos de l'aide générale
      aide: {
        keywords: ['aide', 'help', 'comment', 'quoi faire', 'je ne comprends pas'],
        response: `Je suis là pour t'aider! 😊\n\nTu peux:\n🎮 Jouer aux 5 jeux\n👧 Voir ta progression\n🏆 Gagner des badges\n💭 Me poser des questions\n\nQuel jeu veux-tu essayer?\n- 🧠 Mémoire\n- 🎨 Couleurs\n- 🔢 Comptage\n- 🐾 Animaux\n- 🔶 Formes\n\nDis-moi lequel! 🎯`
      },

      // Réponse par défaut
      default: {
        keywords: [],
        response: `C'est une très bonne question! 🤔\n\nJe peux t'aider sur:\n- Les jeux et comment jouer\n- Comment compter, reconnaître les couleurs, les formes\n- Les animaux et leurs bruits\n- La mémoire et la concentration\n- Les badges et ta progression\n\nQue veux-tu apprendre? 😊`
      }
    };

    // Chercher la réponse appropriée
    for (const [key, value] of Object.entries(answers)) {
      if (value.keywords.some(keyword => questionLower.includes(keyword))) {
        return value.response;
      }
    }

    return answers.default.response;
  }

  // Générer un conseil personnalisé
  static generatePersonalizedTip(performance) {
    const tips = [];

    if (performance.level === 'débutant') {
      tips.push({
        title: '💡 Astuce Débutant',
        content: 'Commence par le jeu de mémoire, c\'est plus facile! Puis essaie les autres progressivement. 🚀'
      });
    } else if (performance.level === 'intermédiaire') {
      tips.push({
        title: '💡 Astuce Intermédiaire',
        content: 'Tu progresses bien! Essaie les jeux plus difficiles pour devenir un champion! 💪'
      });
    } else {
      tips.push({
        title: '💡 Astuce Champion',
        content: 'Tu es incroyable! Tu maitrises tous les jeux. Aide tes amis à apprendre! 🌟'
      });
    }

    if (performance.weaknesses.length > 0) {
      tips.push({
        title: '🎯 À Améliorer',
        content: `Concentre-toi sur le jeu de ${performance.weaknesses[0]}. Tu vas progresser rapidement! 📚`
      });
    }

    return tips;
  }

  // Analyser les erreurs communes
  static analyzeCommonMistakes(gameData) {
    const mistakes = {
      speedIssues: gameData.filter(g => g.time > 60).length,
      concentrationIssues: gameData.filter(g => g.mistakes > 5).length,
      confidenceIssues: gameData.filter(g => g.score < 30).length
    };

    const advice = [];

    if (mistakes.speedIssues > gameData.length * 0.3) {
      advice.push({
        type: 'speed',
        message: 'Tu prends du temps pour répondre. C\'est normal! Prends ton temps, il n\'y a pas de limite ⏱️'
      });
    }

    if (mistakes.concentrationIssues > gameData.length * 0.3) {
      advice.push({
        type: 'concentration',
        message: 'Essaie de te concentrer davantage. Élimine les distractions et joue dans un endroit calme. 🧠'
      });
    }

    if (mistakes.confidenceIssues > gameData.length * 0.3) {
      advice.push({
        type: 'confidence',
        message: 'Ne sois pas stressé! C\'est normal de faire des erreurs. Tu apprends et tu t\'améliores! 💪'
      });
    }

    return advice;
  }
}

export default AIService;

/**
 * Serviço para buscar GIFs de exercícios de fontes públicas confiáveis
 */

// Mapeamento de nomes em português para IDs do ExerciseDB
const exerciseMapping = {
  // PEITO
  'supino reto': '0025',
  'supino inclinado': '0047',
  'crucifixo reto': '0274',
  'flexão de braço': '0662',
  'supino declinado': '0033',
  'crossover': '0190',
  
  // COSTAS
  'barra fixa': '0651',
  'remada curvada': '0032',
  'pulldown': '0449',
  'remada unilateral': '0311',
  'levantamento terra': '0090',
  'remada cavalinho': '0719',
  
  // PERNAS
  'agachamento livre': '0043',
  'leg press': '0585',
  'cadeira extensora': '0585',
  'mesa flexora': '0590',
  'afundo': '0588',
  'agachamento sumô': '0043',
  'stiff': '0088',
  
  // OMBROS
  'desenvolvimento': '0200',
  'elevação lateral': '0367',
  'elevação frontal': '0310',
  'remada alta': '0138',
  'desenvolvimento arnold': '0123',
  
  // BRAÇOS
  'rosca direta': '0031',
  'rosca alternada': '0270',
  'rosca martelo': '0285',
  'tríceps testa': '0541',
  'tríceps corda': '0619',
  'mergulho': '0108',
  
  // ABDÔMEN
  'abdominal': '0001',
  'prancha': '0658',
  'abdominal bicicleta': '0150',
  'elevação de pernas': '0469',
  'abdominal canivete': '0001'
};

/**
 * Obtém URL do GIF do exercício
 * Usa ExerciseDB (imagens públicas sem necessidade de API key)
 */
export function getExerciseGifUrl(exerciseName) {
  const normalizedName = exerciseName.toLowerCase();
  
  // Tentar encontrar correspondência exata
  let exerciseId = exerciseMapping[normalizedName];
  
  // Se não encontrou, tentar correspondência parcial
  if (!exerciseId) {
    for (const [key, id] of Object.entries(exerciseMapping)) {
      if (normalizedName.includes(key) || key.includes(normalizedName)) {
        exerciseId = id;
        break;
      }
    }
  }
  
  // Se encontrou ID, retornar URL do ExerciseDB
  if (exerciseId) {
    return `https://v2.exercisedb.io/image/${exerciseId}`;
  }
  
  // Fallback: gerar URL genérica ou placeholder
  return generateFallbackUrl(normalizedName);
}

/**
 * Gera URL de fallback para exercício
 */
function generateFallbackUrl(exerciseName) {
  // Usar API do exercisedb com busca
  const searchTerm = exerciseName.replace(/\s+/g, '-').toLowerCase();
  
  // Placeholder baseado na categoria
  if (exerciseName.includes('peito') || exerciseName.includes('supino')) {
    return 'https://v2.exercisedb.io/image/0025'; // Bench press
  } else if (exerciseName.includes('costa') || exerciseName.includes('remada')) {
    return 'https://v2.exercisedb.io/image/0032'; // Barbell row
  } else if (exerciseName.includes('perna') || exerciseName.includes('agachamento')) {
    return 'https://v2.exercisedb.io/image/0043'; // Squat
  } else if (exerciseName.includes('ombro') || exerciseName.includes('desenvolvimento')) {
    return 'https://v2.exercisedb.io/image/0200'; // Shoulder press
  } else if (exerciseName.includes('braço') || exerciseName.includes('rosca') || exerciseName.includes('tríceps')) {
    return 'https://v2.exercisedb.io/image/0031'; // Bicep curl
  } else if (exerciseName.includes('abdômen') || exerciseName.includes('abdominal')) {
    return 'https://v2.exercisedb.io/image/0001'; // Crunches
  }
  
  // Default: exercício genérico
  return 'https://v2.exercisedb.io/image/0001';
}

/**
 * Componente de imagem com fallback
 */
export function ExerciseImage({ src, alt, onError, className }) {
  const [imgSrc, setImgSrc] = React.useState(src);
  const [hasError, setHasError] = React.useState(false);
  const [ isLoading, setIsLoading] = React.useState(true);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      // Tentar obter novo URL baseado no nome do exercício
      const newUrl = getExerciseGifUrl(alt);
      if (newUrl !== imgSrc) {
        setImgSrc(newUrl);
        setIsLoading(true);
      } else {
        // Se ainda falhar, usar placeholder
        setImgSrc('https://via.placeholder.com/400x400/1a1a24/6366f1?text=' + encodeURIComponent(alt.substring(0, 20)));
        setIsLoading(false);
      }
      if (onError) onError();
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="exercise-image-wrapper">
      {isLoading && (
        <div className="exercise-image-loader">
          <div className="spinner"></div>
        </div>
      )}
      <img 
        src={imgSrc} 
        alt={alt} 
        className={className}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
        style={{ opacity: isLoading ? 0 : 1 }}
      />
    </div>
  );
}

// Para uso com React
import React from 'react';

export default {
  getExerciseGifUrl,
  ExerciseImage
};

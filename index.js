window.addEventListener('load', getColor);
document.getElementById('get-color').addEventListener('click', getColor);

function getColor() {
  const hexArvo = document.getElementById('color-pick').value.slice(1);
  const themePick = document.getElementById('theme-pick').value;

  fetch("https://www.thecolorapi.com/scheme?hex=" + hexArvo + "&mode=" + themePick + "&count=5")
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const colors = data.colors;
      for (let i = 0; i < colors.length; i++) {
        const hexValue = colors[i].hex.value;
        document.getElementById(`hex-${i + 1}`).innerHTML = hexValue;
        document.getElementById(`color-${i + 1}`).style.backgroundColor = hexValue;
      }
    })
    .catch((error) => {});
    initializeHexClickToCopy();
}
document.addEventListener('DOMContentLoaded', (event) => {
    initializeHexClickToCopy();
    });

function initializeHexClickToCopy() {
    const hexElements = document.querySelectorAll('.hex-color');
    hexElements.forEach((element) => {
        element.addEventListener('click', (event) => {
            const hex = event.target.innerHTML;
            copyToClipboard(hex);
        });
    }
    );
}
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
      // Optionally, you could display a tooltip or a small message saying "Copied!"
      console.log('Copied to clipboard');
    }).catch(function(err) {
      console.log('Could not copy text: ', err);
    });
  }
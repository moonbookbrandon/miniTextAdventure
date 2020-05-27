const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'You wake up in a strange place and you see a jar premium reefer sitting next to you.',
    options: [
      {
        text: 'Take the stash',
        setState: { stash: true },
        nextText: 2
      },
      {
        text: 'Leave the stash',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'You venture forth in search of answers to where you are when you come across a seedy looking guy in a trench coat.',
    options: [
      {
        text: 'Trade the stash for a switchblade',
        requiredState: (currentState) => currentState.stash,
        setState: { stash: false, switchblade: true },
        nextText: 3
      },
      {
        text: 'Trade the stash for his trenchcoat',
        requiredState: (currentState) => currentState.stash,
        setState: { stash: false, trenchCoat: true },
        nextText: 3
      },
      {
        text: 'Ignore the seedy dude',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'After leaving the scofflaw you start to feel tired and stumble upon a small town next to a dangerous looking liqour store.',
    options: [
      {
        text: 'Explore the liqour store',
        nextText: 4
      },
      {
        text: 'Find a room to sleep at in the town',
        nextText: 5
      },
      {
        text: 'Sleep in the alley of the liqour store',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'You are so tired that you fall asleep while exploring the liqour store and are killed by antivaxers spreading viruses.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Without any money to rent a room you break into the nearest motel and fall asleep. After a few hours of sleep the owner of the motel finds you and has cops arrest you.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'You wake up well rested and full of energy ready to explore the liqour store.',
    options: [
      {
        text: 'Explore the liqour store',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'While exploring the liqour store you come across a group of antivaxers who aren\'t wearing masks.',
    options: [
      {
        text: 'Try to run',
        nextText: 8
      },
      {
        text: 'Attack them with your switchblade.',
        requiredState: (currentState) => currentState.switchblade,
        nextText: 9
      },
      {
        text: 'Pull up your trenchcoat over your head to protect yourself.',
        requiredState: (currentState) => currentState.trenchCoat,
        nextText: 10
      },
      {
        text: 'Throw the premium stash of maryjane at them.',
        requiredState: (currentState) => currentState.stash,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Your attempts to run are in vain and antivaxers easily catch you.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'You foolishly thought you could fight off a group of rabid antivaxers with a switchblade.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'The antivaxers laugh as you cower in your trenchcoat. They utilize their rights and infect you with uncountable number of viruses.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'You threw your jar of primo weed and it exploded. After the residual dust is ingested by the antivaxers (who aren\'t wearing masks) they settle down and go off looking for the nearest White Castle. Seeing your victory you decide to buy some Angry Orchard and go home to relax and watch Netflix.',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1
      }
    ]
  }
]

startGame()
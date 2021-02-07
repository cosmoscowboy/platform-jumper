namespace SpriteKind {
    export const Platform = SpriteKind.create()
}
function animatePlayer (animate: boolean) {
    if (animate) {
        animation.runImageAnimation(
        hero,
        heroImages,
        75,
        true
        )
    } else {
        animation.stopAnimation(animation.AnimationTypes.All, hero)
    }
}
function stopPlatforms () {
    for (let value of platformSprites) {
        value.vx = 0
    }
}
function movePlatforms () {
    for (let value of platformSprites) {
        value.vx = platformSpeed * -1
    }
}
function setPlayer () {
    gravity = 300
    jumping = false
    onPlatform = true
    heroImages = [img`
        . . . . . . . f f f f f . . . . 
        . . . . . . f e e e e e f . . . 
        . . . . . f e e e d d d d f . . 
        . . . . f f e e d f d d f d c . 
        . . . f d d e e d f d d f d c . 
        . . . c d b e e d d d d e e d c 
        f f . c d b e e d d c d d d d c 
        f e f . c f e e d d d c c c c c 
        f e f . . f f e e d d d d d f . 
        f e f . f e e e e f f f f f . . 
        f e f f e e e e e e e f . . . . 
        . f f e e e e f e f f e f . . . 
        . . f e e e e f e f f e f . . . 
        . . . f e f f b d f b d f . . . 
        . . . f d b b d d c d d f . . . 
        . . . f f f f f f f f f . . . . 
        `,img`
        . . . . . . . f f f f f . . . . 
        . . . . . . f e e e e e f . . . 
        . . . . . f e e e d d d d f . . 
        . . . . . f e e d f d d f d c . 
        . . . . f f e e d f d d f d c . 
        . . . f d d e e d d d d e e d c 
        . . . c d b e e d d c d d d d c 
        f f . c d b e e e d d c c c c c 
        f e f . c f f e e e d d d d f . 
        f e f . f e e e e f f f f f f . 
        f e f f e e e e e e e f f f f . 
        . f f e e e e f e f d d f d d f 
        . . f e e e e f e f b d f b d f 
        . . f e f f f f f f f f f f f f 
        . . f d d c f . . . . . . . . . 
        . . f f f f . . . . . . . . . . 
        `,img`
        . . . . . . . f f f f f . . . . 
        . . . . . . f e e e e e f . . . 
        . . . . f f e e e d d d d f . . 
        . . . f d d e e d d d d d d c . 
        . . . c d b e e d f d d f d c . 
        f f . c d b e e d f d d f d d c 
        f e f . c f e e d d d d e e d c 
        f e f . . f e e e d c d d d d c 
        f e f . . f f e e e d c c c f . 
        f e f . f e e e e f f f f f . . 
        . f f f e e e e e e e f . . . . 
        . . f e e e e f e e f e f f . . 
        . . f e e e f f f e e f f e f . 
        . f b f f f f f f c d d b d d f 
        . f d d c f . . f d d d c d d f 
        . . f f f . . . f f f f f f f . 
        `,img`
        . . . . . . . f f f f f . . . . 
        . . . . f f f e e e e e f . . . 
        . . . f d d e e e e d d d f . . 
        . . . c d b e e e d d d d d c . 
        . . . c d b e e d d d d d d c . 
        . f f . c f e e d f d d f d d c 
        f e f . . f e e d f d d f d d c 
        f e f . . f e e d d d d e e d c 
        f e f . . f f e e d c d d d f . 
        f e f . f e e e e e d f f f . . 
        . f f f e e e e e e e f . . . . 
        . . f f b e e e e e f f . . . . 
        . . f f d d c e e f f e f . . . 
        . . . . f f f c d d b d d f . . 
        . . . . . f f d d d c d d f . . 
        . . . . . . f f f f f f f . . . 
        `,img`
        . . . . . . . f f f f f . . . . 
        . . . . . . f e e e e e f . . . 
        . . . . . f e e e d d d d f . . 
        . . . . f f e e d f d d f d c . 
        . . . f d d e e d f d d f d c . 
        . . . c d b e e d d d d e e d c 
        . . . c d b e e d d c d d d d c 
        . . . . c f e e e d d c c c c c 
        . . . . . f f e e e d d d d f . 
        . . . . f e e e e f f f f f . . 
        f f . f e e e e e e f f . . . . 
        f e . f e e f e e f e e f . . . 
        f e . f e e e f e e f e e f . . 
        f e f f e f b b f b d f d b f . 
        f f f f e b d d f d d f d d f . 
        . f f f f f f f f f f f f f . . 
        `]
    hero = sprites.create(heroImages[0], SpriteKind.Player)
    hero.ay = gravity
    setPlayerOnPlatform()
    animatePlayer(true)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(jumping) && onPlatform) {
        animatePlayer(false)
        hero.setImage(heroImages[1])
        jumping = true
        hero.vy = -150
        hero.ay = gravity
    }
})
function setVariables () {
    platformWidth = 16
    platformHeight = 12
    platformSpeed = 75
    platformMinimumRequired = 2
    platformMaximumRequired = scene.screenWidth() / platformWidth
    gapMinimum = 1
    gapMaximum = 3
    platformImages = [assets.image`brick1`, assets.image`brick2`, assets.image`brick3`, assets.image`brick4`]
    setNextGap()
    platformSprites = []
    platformsToDelete = []
}
function drawPlatform (totalTiles: number, placeRightOfScreen: boolean, platformImage: Image) {
    platformLevelCurrent = 0
    for (let index = 0; index <= totalTiles - 1; index++) {
        platformSprite = sprites.create(platformImage, SpriteKind.Platform)
        platformSprite.bottom = scene.screenHeight()
        if (placeRightOfScreen) {
            platformSprite.left = scene.screenWidth() + platformSprite.width * index
        } else {
            platformSprite.left = 0 + platformSprite.width * index
        }
        platformSprites.push(platformSprite)
    }
}
function spawnPlatforms () {
    platformSprite = platformSprites[platformSprites.length - 1]
    if (platformSprite.right < scene.screenWidth() - gapWidth * platformWidth) {
        platformTotalToSpawn = randint(platformMinimumRequired, platformMaximumRequired)
        platformLevelCurrent = randint(0, Math.constrain(platformImages.length - 1, 0, platformLevelCurrent + 2))
        drawPlatform(platformTotalToSpawn, true, platformImages[platformLevelCurrent])
        movePlatforms()
        setNextGap()
    }
}
function checkPlatforms () {
    platformsToDelete = []
    for (let value of platformSprites) {
        if (value.right < 0) {
            platformsToDelete.push(value)
        }
    }
    for (let value of platformsToDelete) {
        platformSprites.removeAt(platformSprites.indexOf(value))
        info.changeScoreBy(1)
        value.destroy()
    }
}
function setPlayerOnPlatform () {
    hero.bottom = platformSprites[0].top - 1
    hero.right = platformWidth * 2
}
function setNextGap () {
    gapWidth = randint(gapMinimum, gapMaximum)
}
function checkPlayer () {
    for (let value of platformSprites) {
        if (hero.overlapsWith(value)) {
            if (hero.bottom <= value.top + 5) {
                if (jumping) {
                    animatePlayer(true)
                    hero.setImage(heroImages[3])
                }
                jumping = false
                onPlatform = true
                while (hero.bottom > value.top) {
                    hero.bottom += -1
                }
                hero.vy = 0
                hero.ay = 0
            } else {
                stopPlatforms()
            }
        } else {
            if (!(onPlatform)) {
                onPlatform = false
            }
            hero.ay = gravity
        }
    }
    if (hero.top > scene.screenHeight()) {
        stopPlatforms()
        game.over(false, effects.melt)
    }
}
let platformTotalToSpawn = 0
let gapWidth = 0
let platformSprite: Sprite = null
let platformLevelCurrent = 0
let platformsToDelete: Sprite[] = []
let gapMaximum = 0
let gapMinimum = 0
let platformMinimumRequired = 0
let platformHeight = 0
let platformWidth = 0
let onPlatform = false
let jumping = false
let gravity = 0
let platformSpeed = 0
let platformSprites: Sprite[] = []
let heroImages: Image[] = []
let hero: Sprite = null
let platformImages: Image[] = []
let platformMaximumRequired = 0
setVariables()
drawPlatform(platformMaximumRequired, false, platformImages[0])
setPlayer()
movePlatforms()
game.onUpdate(function () {
    checkPlatforms()
    spawnPlatforms()
    checkPlayer()
})

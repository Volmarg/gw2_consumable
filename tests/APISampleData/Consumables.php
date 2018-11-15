<?php
/**
 * Created by PhpStorm.
 * User: Volmarg Reiso
 * Date: 15.11.2018
 * Time: 17:35
 */

namespace Tests\APISampleData;


class Consumables {

    protected static $string_acquired_from_api;

    public static function getStringAcquiredFromApi() {
        return self::$string_acquired_from_api;
    }

    public static function setStringAcquiredFromApi_oneItem() {
        self::$string_acquired_from_api = '
              {
                "name": "Extended Potion of Undead Slaying",
                "type": "Consumable",
                "level": 80,
                "rarity": "Rare",
                "vendor_value": 1,
                "game_types": [
                  "Wvw",
                  "Dungeon",
                  "Pve"
                ],
                "flags": [
                  "SoulbindOnAcquire",
                  "SoulBindOnUse"
                ],
                "restrictions": [],
                "id": 8485,
                "chat_link": "[&AgElIQAA]",
                "icon": "https://render.guildwars2.com/file/C9714BFA6D0068F1F89927156AFAD8161A5668F1/222682.png",
                "details": {
                  "type": "Utility",
                  "duration_ms": 7200000,
                  "apply_count": 1,
                  "name": "Enhancement",
                  "icon": "https://render.guildwars2.com/file/64976F59BF060718C9109D36C27AD0F40F06BB32/436368.png",
                  "description": "+10% Damage vs. Undead\n-10% Damage from Undead\n+10% Experience from Kills"
                }
              }
        ';
    }

    public static function setStringAcquiredFromApi_multipleItems() {
        self::$string_acquired_from_api = '[
              {
                "name": "Extended Potion of Undead Slaying",
                "type": "Consumable",
                "level": 80,
                "rarity": "Rare",
                "vendor_value": 1,
                "game_types": [
                  "Wvw",
                  "Dungeon",
                  "Pve"
                ],
                "flags": [
                  "SoulbindOnAcquire",
                  "SoulBindOnUse"
                ],
                "restrictions": [],
                "id": 8485,
                "chat_link": "[&AgElIQAA]",
                "icon": "https://render.guildwars2.com/file/C9714BFA6D0068F1F89927156AFAD8161A5668F1/222682.png",
                "details": {
                  "type": "Utility",
                  "duration_ms": 7200000,
                  "apply_count": 1,
                  "name": "Enhancement",
                  "icon": "https://render.guildwars2.com/file/64976F59BF060718C9109D36C27AD0F40F06BB32/436368.png",
                  "description": "+10% Damage vs. Undead\n-10% Damage from Undead\n+10% Experience from Kills"
                }
              },
              {
                "name": "Extended Potion of Nightmare Court Slaying",
                "type": "Consumable",
                "level": 80,
                "rarity": "Rare",
                "vendor_value": 1,
                "game_types": [
                  "Wvw",
                  "Dungeon",
                  "Pve"
                ],
                "flags": [
                  "SoulbindOnAcquire",
                  "SoulBindOnUse"
                ],
                "restrictions": [],
                "id": 8486,
                "chat_link": "[&AgEmIQAA]",
                "icon": "https://render.guildwars2.com/file/E079346EA36BFBBD752B0A18B1A976962C15EEF5/222666.png",
                "details": {
                  "type": "Utility",
                  "duration_ms": 7200000,
                  "apply_count": 1,
                  "name": "Enhancement",
                  "icon": "https://render.guildwars2.com/file/64976F59BF060718C9109D36C27AD0F40F06BB32/436368.png",
                  "description": "+10% Damage vs. Nightmare Court\n-10% Damage from Nightmare Court\n+10% Experience from Kills"
                }
              }
            ]';

    }

    public static function setTestString() {
        self::$string_acquired_from_api = 'test';
    }
}
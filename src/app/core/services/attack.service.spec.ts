import 'jest';
import {TestBed, async} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AttackService} from './attack.service';
import {catchError} from "rxjs/operators";
import {of} from "rxjs";

const megaPunch = {
  accuracy: 85,
  contest_combos: {
    normal: {
      use_after: [
        {
          name: 'focus-energy',
          url: 'https://pokeapi.co/api/v2/move/116/'
        },
        {
          name: 'mind-reader',
          url: 'https://pokeapi.co/api/v2/move/170/'
        }
      ],
      use_before: null
    },
    super: {
      use_after: null,
      use_before: null
    }
  },
  contest_effect: {
    url: 'https://pokeapi.co/api/v2/contest-effect/1/'
  },
  contest_type: {
    name: 'tough',
    url: 'https://pokeapi.co/api/v2/contest-type/5/'
  },
  damage_class: {
    name: 'physical',
    url: 'https://pokeapi.co/api/v2/move-damage-class/2/'
  },
  effect_chance: null,
  effect_changes: [],
  effect_entries: [
    {
      effect: 'Inflicts regular damage.',
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/'
      },
      short_effect: 'Inflicts regular damage with no additional effect.'
    }
  ],
  flavor_text_entries: [
    {
      flavor_text: '用充满力量的拳头攻击对手。',
      language: {
        name: 'zh-Hans',
        url: 'https://pokeapi.co/api/v2/language/12/'
      },
      version_group: {
        name: 'ultra-sun-ultra-moon',
        url: 'https://pokeapi.co/api/v2/version-group/18/'
      }
    },
    {
      flavor_text: '力を　こめた　パンチで\n相手を　攻撃する。',
      language: {
        name: 'ja',
        url: 'https://pokeapi.co/api/v2/language/11/'
      },
      version_group: {
        name: 'ultra-sun-ultra-moon',
        url: 'https://pokeapi.co/api/v2/version-group/18/'
      }
    },
    {
      flavor_text: 'The target is slugged by a punch thrown with\nmuscle-packed power.',
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/'
      },
      version_group: {
        name: 'ultra-sun-ultra-moon',
        url: 'https://pokeapi.co/api/v2/version-group/18/'
      }
    },
    {
      flavor_text: 'Colpisce il bersaglio con un pugno poderoso.',
      language: {
        name: 'it',
        url: 'https://pokeapi.co/api/v2/language/8/'
      },
      version_group: {
        name: 'ultra-sun-ultra-moon',
        url: 'https://pokeapi.co/api/v2/version-group/18/'
      }
    },
    {
      flavor_text: 'Un puñetazo de gran potencia.',
      language: {
        name: 'es',
        url: 'https://pokeapi.co/api/v2/language/7/'
      },
      version_group: {
        name: 'ultra-sun-ultra-moon',
        url: 'https://pokeapi.co/api/v2/version-group/18/'
      }
    },
    {
      flavor_text: 'Ein unglaublich kräftiger Hieb.',
      language: {
        name: 'de',
        url: 'https://pokeapi.co/api/v2/language/6/'
      },
      version_group: {
        name: 'ultra-sun-ultra-moon',
        url: 'https://pokeapi.co/api/v2/version-group/18/'
      }
    },
    {
      flavor_text: 'L’ennemi reçoit un coup de poing d’une puissance\nincroyable.',
      language: {
        name: 'fr',
        url: 'https://pokeapi.co/api/v2/language/5/'
      },
      version_group: {
        name: 'ultra-sun-ultra-moon',
        url: 'https://pokeapi.co/api/v2/version-group/18/'
      }
    },
    {
      flavor_text: '用帶有強大力量的拳頭\n攻擊對手。',
      language: {
        name: 'zh-Hant',
        url: 'https://pokeapi.co/api/v2/language/4/'
      },
      version_group: {
        name: 'ultra-sun-ultra-moon',
        url: 'https://pokeapi.co/api/v2/version-group/18/'
      }
    },
    {
      flavor_text: '힘을 담은 펀치로\n상대를 공격한다.',
      language: {
        name: 'ko',
        url: 'https://pokeapi.co/api/v2/language/3/'
      },
      version_group: {
        name: 'ultra-sun-ultra-moon',
        url: 'https://pokeapi.co/api/v2/version-group/18/'
      }
    },
    {
      flavor_text: 'ちからを　こめた　パンチで\nあいてを　こうげきする。',
      language: {
        name: 'ja-Hrkt',
        url: 'https://pokeapi.co/api/v2/language/1/'
      },
      version_group: {
        name: 'ultra-sun-ultra-moon',
        url: 'https://pokeapi.co/api/v2/version-group/18/'
      }
    },
    {
      flavor_text: '用充满力量的拳头攻击对手。',
      language: {
        name: 'zh-Hans',
        url: 'https://pokeapi.co/api/v2/language/12/'
      },
      version_group: {
        name: 'sun-moon',
        url: 'https://pokeapi.co/api/v2/version-group/17/'
      }
    },
    {
      flavor_text: '力を　こめた　パンチで\n相手を　攻撃する。',
      language: {
        name: 'ja',
        url: 'https://pokeapi.co/api/v2/language/11/'
      },
      version_group: {
        name: 'sun-moon',
        url: 'https://pokeapi.co/api/v2/version-group/17/'
      }
    },
    {
      flavor_text: 'The target is slugged by a punch thrown with\nmuscle-packed power.',
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/'
      },
      version_group: {
        name: 'sun-moon',
        url: 'https://pokeapi.co/api/v2/version-group/17/'
      }
    },
    {
      flavor_text: 'Colpisce il bersaglio con un pugno poderoso.',
      language: {
        name: 'it',
        url: 'https://pokeapi.co/api/v2/language/8/'
      },
      version_group: {
        name: 'sun-moon',
        url: 'https://pokeapi.co/api/v2/version-group/17/'
      }
    },
    {
      flavor_text: 'Un puñetazo de gran potencia.',
      language: {
        name: 'es',
        url: 'https://pokeapi.co/api/v2/language/7/'
      },
      version_group: {
        name: 'sun-moon',
        url: 'https://pokeapi.co/api/v2/version-group/17/'
      }
    },
    {
      flavor_text: 'Ein unglaublich kräftiger Hieb.',
      language: {
        name: 'de',
        url: 'https://pokeapi.co/api/v2/language/6/'
      },
      version_group: {
        name: 'sun-moon',
        url: 'https://pokeapi.co/api/v2/version-group/17/'
      }
    },
    {
      flavor_text: 'L’ennemi reçoit un coup de poing d’une puissance\nincroyable.',
      language: {
        name: 'fr',
        url: 'https://pokeapi.co/api/v2/language/5/'
      },
      version_group: {
        name: 'sun-moon',
        url: 'https://pokeapi.co/api/v2/version-group/17/'
      }
    },
    {
      flavor_text: '用帶有強大力量的拳頭\n攻擊對手。',
      language: {
        name: 'zh-Hant',
        url: 'https://pokeapi.co/api/v2/language/4/'
      },
      version_group: {
        name: 'sun-moon',
        url: 'https://pokeapi.co/api/v2/version-group/17/'
      }
    },
    {
      flavor_text: '힘을 담은 펀치로\n상대를 공격한다.',
      language: {
        name: 'ko',
        url: 'https://pokeapi.co/api/v2/language/3/'
      },
      version_group: {
        name: 'sun-moon',
        url: 'https://pokeapi.co/api/v2/version-group/17/'
      }
    },
    {
      flavor_text: 'ちからを　こめた　パンチで\nあいてを　こうげきする。',
      language: {
        name: 'ja-Hrkt',
        url: 'https://pokeapi.co/api/v2/language/1/'
      },
      version_group: {
        name: 'sun-moon',
        url: 'https://pokeapi.co/api/v2/version-group/17/'
      }
    },
    {
      flavor_text: '力を　こめた　パンチで\n相手を　攻撃する。\n',
      language: {
        name: 'ja',
        url: 'https://pokeapi.co/api/v2/language/11/'
      },
      version_group: {
        name: 'omega-ruby-alpha-sapphire',
        url: 'https://pokeapi.co/api/v2/version-group/16/'
      }
    },
    {
      flavor_text: 'The target is slugged by a punch thrown\nwith muscle-packed power.',
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/'
      },
      version_group: {
        name: 'omega-ruby-alpha-sapphire',
        url: 'https://pokeapi.co/api/v2/version-group/16/'
      }
    },
    {
      flavor_text: 'Colpisce il bersaglio con un pugno poderoso.',
      language: {
        name: 'it',
        url: 'https://pokeapi.co/api/v2/language/8/'
      },
      version_group: {
        name: 'omega-ruby-alpha-sapphire',
        url: 'https://pokeapi.co/api/v2/version-group/16/'
      }
    },
    {
      flavor_text: 'Un puñetazo de gran potencia.',
      language: {
        name: 'es',
        url: 'https://pokeapi.co/api/v2/language/7/'
      },
      version_group: {
        name: 'omega-ruby-alpha-sapphire',
        url: 'https://pokeapi.co/api/v2/version-group/16/'
      }
    },
    {
      flavor_text: 'Ein unglaublich kräftiger Hieb.',
      language: {
        name: 'de',
        url: 'https://pokeapi.co/api/v2/language/6/'
      },
      version_group: {
        name: 'omega-ruby-alpha-sapphire',
        url: 'https://pokeapi.co/api/v2/version-group/16/'
      }
    },
    {
      flavor_text: 'L’ennemi reçoit un coup de poing d’une puissance\nincroyable.',
      language: {
        name: 'fr',
        url: 'https://pokeapi.co/api/v2/language/5/'
      },
      version_group: {
        name: 'omega-ruby-alpha-sapphire',
        url: 'https://pokeapi.co/api/v2/version-group/16/'
      }
    },
    {
      flavor_text: '힘을 담은 펀치로\n상대를 공격한다.',
      language: {
        name: 'ko',
        url: 'https://pokeapi.co/api/v2/language/3/'
      },
      version_group: {
        name: 'omega-ruby-alpha-sapphire',
        url: 'https://pokeapi.co/api/v2/version-group/16/'
      }
    },
    {
      flavor_text: 'ちからを　こめた　パンチで\nあいてを　こうげきする。\n',
      language: {
        name: 'ja-Hrkt',
        url: 'https://pokeapi.co/api/v2/language/1/'
      },
      version_group: {
        name: 'omega-ruby-alpha-sapphire',
        url: 'https://pokeapi.co/api/v2/version-group/16/'
      }
    },
    {
      flavor_text: '力を　こめた　パンチで\n相手を　攻撃する。\n',
      language: {
        name: 'ja',
        url: 'https://pokeapi.co/api/v2/language/11/'
      },
      version_group: {
        name: 'x-y',
        url: 'https://pokeapi.co/api/v2/version-group/15/'
      }
    },
    {
      flavor_text: 'The target is slugged by a punch thrown\nwith muscle-packed power.',
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/'
      },
      version_group: {
        name: 'x-y',
        url: 'https://pokeapi.co/api/v2/version-group/15/'
      }
    },
    {
      flavor_text: 'Colpisce il bersaglio con un pugno poderoso.',
      language: {
        name: 'it',
        url: 'https://pokeapi.co/api/v2/language/8/'
      },
      version_group: {
        name: 'x-y',
        url: 'https://pokeapi.co/api/v2/version-group/15/'
      }
    },
    {
      flavor_text: 'Un puñetazo de gran potencia.',
      language: {
        name: 'es',
        url: 'https://pokeapi.co/api/v2/language/7/'
      },
      version_group: {
        name: 'x-y',
        url: 'https://pokeapi.co/api/v2/version-group/15/'
      }
    },
    {
      flavor_text: 'Ein unglaublich kräftiger Hieb.',
      language: {
        name: 'de',
        url: 'https://pokeapi.co/api/v2/language/6/'
      },
      version_group: {
        name: 'x-y',
        url: 'https://pokeapi.co/api/v2/version-group/15/'
      }
    },
    {
      flavor_text: 'L’ennemi reçoit un coup de poing d’une puissance\nincroyable.',
      language: {
        name: 'fr',
        url: 'https://pokeapi.co/api/v2/language/5/'
      },
      version_group: {
        name: 'x-y',
        url: 'https://pokeapi.co/api/v2/version-group/15/'
      }
    },
    {
      flavor_text: '힘을 담은 펀치로\n상대를 공격한다.',
      language: {
        name: 'ko',
        url: 'https://pokeapi.co/api/v2/language/3/'
      },
      version_group: {
        name: 'x-y',
        url: 'https://pokeapi.co/api/v2/version-group/15/'
      }
    },
    {
      flavor_text: 'ちからを　こめた　パンチで\nあいてを　こうげきする。\n',
      language: {
        name: 'ja-Hrkt',
        url: 'https://pokeapi.co/api/v2/language/1/'
      },
      version_group: {
        name: 'x-y',
        url: 'https://pokeapi.co/api/v2/version-group/15/'
      }
    },
    {
      flavor_text: 'The target is slugged by a punch thrown\nwith muscle-packed power.',
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/'
      },
      version_group: {
        name: 'black-2-white-2',
        url: 'https://pokeapi.co/api/v2/version-group/14/'
      }
    },
    {
      flavor_text: 'The target is slugged by a punch thrown\nwith muscle-packed power.',
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/'
      },
      version_group: {
        name: 'black-white',
        url: 'https://pokeapi.co/api/v2/version-group/11/'
      }
    },
    {
      flavor_text: 'L’ennemi reçoit un coup de poing\nd’une puissance incroyable.',
      language: {
        name: 'fr',
        url: 'https://pokeapi.co/api/v2/language/5/'
      },
      version_group: {
        name: 'black-white',
        url: 'https://pokeapi.co/api/v2/version-group/11/'
      }
    },
    {
      flavor_text: 'The foe is slugged\nby a punch thrown\nwith muscle-packed\npower.\n',
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/'
      },
      version_group: {
        name: 'heartgold-soulsilver',
        url: 'https://pokeapi.co/api/v2/version-group/10/'
      }
    },
    {
      flavor_text: 'The foe is slugged\nby a punch thrown\nwith muscle-packed\npower.\n',
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/'
      },
      version_group: {
        name: 'platinum',
        url: 'https://pokeapi.co/api/v2/version-group/9/'
      }
    },
    {
      flavor_text: 'The foe is slugged\nby a punch thrown\nwith muscle-packed\npower.\n',
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/'
      },
      version_group: {
        name: 'diamond-pearl',
        url: 'https://pokeapi.co/api/v2/version-group/8/'
      }
    },
    {
      flavor_text: 'The foe is slugged\nby a punch thrown\nwith muscle-packed\npower.',
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/'
      },
      version_group: {
        name: 'firered-leafgreen',
        url: 'https://pokeapi.co/api/v2/version-group/7/'
      }
    },
    {
      flavor_text: 'A strong punch thrown with\nincredible power.',
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/'
      },
      version_group: {
        name: 'emerald',
        url: 'https://pokeapi.co/api/v2/version-group/6/'
      }
    },
    {
      flavor_text: 'A strong punch thrown with\nincredible power.',
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/'
      },
      version_group: {
        name: 'ruby-sapphire',
        url: 'https://pokeapi.co/api/v2/version-group/5/'
      }
    },
    {
      flavor_text: 'A powerful punch\nthrown very hard.',
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/'
      },
      version_group: {
        name: 'crystal',
        url: 'https://pokeapi.co/api/v2/version-group/4/'
      }
    },
    {
      flavor_text: 'A powerful punch\nthrown very hard.',
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/'
      },
      version_group: {
        name: 'gold-silver',
        url: 'https://pokeapi.co/api/v2/version-group/3/'
      }
    }
  ],
  generation: {
    name: 'generation-i',
    url: 'https://pokeapi.co/api/v2/generation/1/'
  },
  id: 5,
  machines: [
    {
      machine: {
        url: 'https://pokeapi.co/api/v2/machine/1/'
      },
      version_group: {
        name: 'red-blue',
        url: 'https://pokeapi.co/api/v2/version-group/1/'
      }
    },
    {
      machine: {
        url: 'https://pokeapi.co/api/v2/machine/2/'
      },
      version_group: {
        name: 'yellow',
        url: 'https://pokeapi.co/api/v2/version-group/2/'
      }
    }
  ],
  meta: {
    ailment: {
      name: 'none',
      url: 'https://pokeapi.co/api/v2/move-ailment/0/'
    },
    ailment_chance: 0,
    category: {
      name: 'damage',
      url: 'https://pokeapi.co/api/v2/move-category/0/'
    },
    crit_rate: 0,
    drain: 0,
    flinch_chance: 0,
    healing: 0,
    max_hits: null,
    max_turns: null,
    min_hits: null,
    min_turns: null,
    stat_chance: 0
  },
  name: 'mega-punch',
  names: [
    {
      language: {
        name: 'zh-Hans',
        url: 'https://pokeapi.co/api/v2/language/12/'
      },
      name: '百万吨重拳'
    },
    {
      language: {
        name: 'ja',
        url: 'https://pokeapi.co/api/v2/language/11/'
      },
      name: 'メガトンパンチ'
    },
    {
      language: {
        name: 'en',
        url: 'https://pokeapi.co/api/v2/language/9/'
      },
      name: 'Mega Punch'
    },
    {
      language: {
        name: 'it',
        url: 'https://pokeapi.co/api/v2/language/8/'
      },
      name: 'Megapugno'
    },
    {
      language: {
        name: 'es',
        url: 'https://pokeapi.co/api/v2/language/7/'
      },
      name: 'Megapuño'
    },
    {
      language: {
        name: 'de',
        url: 'https://pokeapi.co/api/v2/language/6/'
      },
      name: 'Megahieb'
    },
    {
      language: {
        name: 'fr',
        url: 'https://pokeapi.co/api/v2/language/5/'
      },
      name: 'Ultimapoing'
    },
    {
      language: {
        name: 'zh-Hant',
        url: 'https://pokeapi.co/api/v2/language/4/'
      },
      name: '百萬噸重拳'
    },
    {
      language: {
        name: 'ko',
        url: 'https://pokeapi.co/api/v2/language/3/'
      },
      name: '메가톤펀치'
    },
    {
      language: {
        name: 'ja-Hrkt',
        url: 'https://pokeapi.co/api/v2/language/1/'
      },
      name: 'メガトンパンチ'
    }
  ],
  past_values: [],
  power: 80,
  pp: 20,
  priority: 0,
  stat_changes: [],
  super_contest_effect: {
    url: 'https://pokeapi.co/api/v2/super-contest-effect/18/'
  },
  target: {
    name: 'selected-pokemon',
    url: 'https://pokeapi.co/api/v2/move-target/10/'
  },
  type: {
    name: 'normal',
    url: 'https://pokeapi.co/api/v2/type/1/'
  }
};

describe('Test Attack Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AttackService]
    });
  });

  it('When we want to find an attack as an object', async(() => {
    const attackService = TestBed.get(AttackService);
    const http = TestBed.get(HttpTestingController);
    const mockAttack = megaPunch;

    attackService.getAttackDetail('https://pokeapi.co/api/v2/move/5/').subscribe(attack => expect(typeof attack).toBe('object'));

    http.expectOne('https://pokeapi.co/api/v2/move/5/').flush(mockAttack);
  }));

  it('When we want to find an attack name as valid string', async(() => {
    const attackService = TestBed.get(AttackService);
    const http = TestBed.get(HttpTestingController);
    const mockAttack = megaPunch;

    attackService.getAttackDetail('https://pokeapi.co/api/v2/move/5/').subscribe(attack => expect(attack.name).toBe('mega-punch'));

    http.expectOne('https://pokeapi.co/api/v2/move/5/').flush(mockAttack);
  }));

  it('When we want to find an attack power as valid number', async(() => {
    const attackService = TestBed.get(AttackService);
    const http = TestBed.get(HttpTestingController);
    const mockAttack = megaPunch;

    attackService.getAttackDetail('https://pokeapi.co/api/v2/move/5/').subscribe(attack => expect(attack.power).toBe(80));

    http.expectOne('https://pokeapi.co/api/v2/move/5/').flush(mockAttack);
  }));

  it('When we want to find an attack with an invalid uri', async(() => {
    const attackService = TestBed.get(AttackService);
    const http = TestBed.get(HttpTestingController);
    const statusCode = 404;

    attackService.getAttackDetail('https://pokeapi.co/api/v2/move/10000/').pipe(
        catchError(httpError => {
          expect(httpError.error).toBe(404);
          return of(httpError);
        })
    ).subscribe();

    http.expectOne('https://pokeapi.co/api/v2/move/10000/').error(statusCode);
  }));
});

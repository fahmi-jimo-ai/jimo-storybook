import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, useMemo } from 'react';
import * as IcnsaxReact from 'iconsax-react';
import { Icon, CloseIcon, SpinnerIcon } from '../../../src/components/ui/Icon/Icon';

/**
 * Foundations/Icons — IconGallery
 * Full browsable gallery of all 993 iconsax-react icons.
 * Supports search, 3 sizes, 2 variants (Linear / Bold), and custom color.
 * Custom Moji icons (CloseIcon, SpinnerIcon) are shown separately.
 */
const meta: Meta = {
  title: 'Foundations/Icons',
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/66ejN3hqSMkUXIPgmkebFH/Moji',
    },
  },
};

export default meta;
type Story = StoryObj;

// iconsax-react v0.0.8 — complete list of all 993 icon names
// Hardcoded to avoid CJS/ESM interop issues with import-* namespace enumeration
const ALL_ICON_NAMES: readonly string[] = [
  'Aave','Activity','Add','AddCircle','AddSquare','Additem','Airdrop','Airplane',
  'AirplaneSquare','Airpod','Airpods','Alarm','AlignBottom','AlignHorizontally',
  'AlignLeft','AlignRight','AlignTop','AlignVertically','Android','Ankr','Apple',
  'Aquarius','Archive','ArchiveAdd','ArchiveBook','ArchiveBox','ArchiveMinus',
  'ArchiveSlash','ArchiveTick','ArrangeHorizontal','ArrangeHorizontalCircle',
  'ArrangeHorizontalSquare','ArrangeVertical','ArrangeVerticalCircle',
  'ArrangeVerticalSquare','Arrow','ArrowCircleDown','ArrowCircleDown2',
  'ArrowCircleLeft','ArrowCircleLeft2','ArrowCircleRight','ArrowCircleRight2',
  'ArrowCircleUp','ArrowCircleUp2','ArrowDown','ArrowDown2','ArrowDown3',
  'ArrowForward','ArrowForwardSquare','ArrowLeft','ArrowLeft2','ArrowLeft3',
  'ArrowRight','ArrowRight2','ArrowRight3','ArrowRotateLeft','ArrowRotateRight',
  'ArrowSquare','ArrowSquareDown','ArrowSquareLeft','ArrowSquareRight',
  'ArrowSquareUp','ArrowSwapHorizontal','ArrowSwapVertical','ArrowUp','ArrowUp2',
  'ArrowUp3','AttachCircle','AttachSquare','AudioSquare','Augur','Autobrightness',
  'Autonio','Avalanche','Award','Back','BackSquare','Backward','Backward10Seconds',
  'Backward15Seconds','Backward5Seconds','BackwardItem','Bag','Bag2','BagCross',
  'BagCross1','BagHappy','BagTick','BagTick2','BagTimer','Bank','Barcode',
  'BatteryCharging','BatteryDisable','BatteryEmpty','BatteryEmpty1','BatteryFull',
  'Be','Bezier','Bill','BinanceCoin','BinanceUsd','Bitcoin','BitcoinCard',
  'BitcoinConvert','BitcoinRefresh','Blend','Blend2','Blogger','Bluetooth',
  'Bluetooth2','BluetoothCircle','BluetoothRectangle','Blur','Book','Book1',
  'BookSaved','BookSquare','Bookmark','Bookmark2','Bootstrap','Box','Box1','Box2',
  'BoxAdd','BoxRemove','BoxSearch','BoxTick','BoxTime','Briefcase','BrifecaseCross',
  'BrifecaseTick','BrifecaseTimer','Brodcast','Broom','Brush','Brush2','Brush3',
  'BrushBig','BrushSquare','Bubble','Bucket','BucketCircle','BucketSquare',
  'Building','Building3','Building4','Buildings','Buildings2','Buliding','Bus',
  'BuyCrypto','Cake','Calculator','Calendar','Calendar1','Calendar2','CalendarAdd',
  'CalendarCircle','CalendarEdit','CalendarRemove','CalendarSearch','CalendarTick',
  'Call','CallAdd','CallCalling','CallIncoming','CallMinus','CallOutgoing',
  'CallReceived','CallRemove','CallSlash','Camera','CameraSlash','Candle','Candle2',
  'Car','Card','CardAdd','CardCoin','CardEdit','CardPos','CardReceive','CardRemove',
  'CardRemove1','CardSend','CardSlash','CardTick','CardTick1','Cardano','Cards',
  'Category','Category2','Cd','Celo','Celsius','Chainlink','Chart','Chart1',
  'Chart2','Chart21','ChartCircle','ChartFail','ChartSquare','ChartSuccess',
  'Check','ChemicalGlass','Chrome','Civic','Clipboard','ClipboardClose',
  'ClipboardExport','ClipboardImport','ClipboardText','ClipboardTick','Clock',
  'CloseCircle','CloseSquare','Cloud','CloudAdd','CloudChange','CloudConnection',
  'CloudCross','CloudDrizzle','CloudFog','CloudLightning','CloudMinus','CloudNotif',
  'CloudPlus','CloudRemove','CloudSnow','CloudSunny','Code','Code1','CodeCircle',
  'Coffee','Coin','Coin1','ColorSwatch','Colorfilter','ColorsSquare','Command',
  'CommandSquare','Component','Computing','Convert','Convert3DCube','ConvertCard',
  'Convertshape','Convertshape2','Copy','CopySuccess','Copyright','Courthouse',
  'Cpu','CpuCharge','CpuSetting','CreativeCommons','Crop','Crown','Crown1','Cup',
  'Cut','Dai','Danger','Dash','Data','Data2','Decred','Dent','Designtools',
  'DeviceMessage','Devices','Diagram','Diamonds','Direct','DirectDown',
  'DirectInbox','DirectLeft','DirectNormal','DirectNotification','DirectRight',
  'DirectSend','DirectUp','DirectboxDefault','DirectboxNotif','DirectboxReceive',
  'DirectboxSend','DiscountCircle','DiscountShape','Discover','Dislike','Document',
  'DocumentCloud','DocumentCode','DocumentCode2','DocumentCopy','DocumentDownload',
  'DocumentFavorite','DocumentFilter','DocumentForward','DocumentLike',
  'DocumentPrevious','DocumentSketch','DocumentText','DocumentText1',
  'DocumentUpload','DollarCircle','DollarSquare','Dribbble','Driver','Driver2',
  'DriverRefresh','Driving','Drop','Dropbox','Edit','Edit2','Educare','Electricity',
  'Element','Element2','Element3','Element4','ElementEqual','ElementPlus',
  'Emercoin','EmojiHappy','EmojiNormal','EmojiSad','EmptyWallet','EmptyWalletAdd',
  'EmptyWalletChange','EmptyWalletRemove','EmptyWalletTick','EmptyWalletTime',
  'EnjinCoin','Eos','Eraser','EraserSquare','Ethereum','EthereumClassic','Export',
  'ExportCircle','ExportCurve','ExportSquare','ExternalDrive','Eye','EyeSlash',
  'Facebook','Fatrows','FavoriteChart','Figma','Figma1','Filter','FilterAdd',
  'FilterEdit','FilterRemove','FilterSearch','FilterSquare','FilterTick',
  'FingerCricle','FingerScan','Firstline','Flag','Flag2','Flash','FlashCircle',
  'FlashSlash','Flashy','Folder','Folder2','FolderAdd','FolderCloud',
  'FolderConnection','FolderCross','FolderFavorite','FolderMinus','FolderOpen',
  'Forbidden','Forbidden2','FormatCircle','FormatSquare','Forward',
  'Forward10Seconds','Forward15Seconds','Forward5Seconds','ForwardItem','Framer',
  'FtxToken','Gallery','GalleryAdd','GalleryEdit','GalleryExport','GalleryFavorite',
  'GalleryImport','GalleryRemove','GallerySlash','GalleryTick','Game','Gameboy',
  'GasStation','Gemini','Gemini2','Ghost','Gift','Glass','Global','GlobalEdit',
  'GlobalRefresh','GlobalSearch','Google','GoogleDrive','GooglePlay','Gps',
  'GpsSlash','Grammerly','Graph','Grid1','Grid2','Grid3','Grid4','Grid5','Grid6',
  'Grid7','Grid8','Grid9','GridEdit','GridEraser','GridLock','HambergerMenu',
  'Happyemoji','Harmony','Hashtag','HashtagDown','HashtagSquare','HashtagUp',
  'Headphone','Headphones','Health','Heart','HeartAdd','HeartCircle','HeartEdit',
  'HeartRemove','HeartSearch','HeartSlash','HeartTick','HederaHashgraph','Hex',
  'Hierarchy','Hierarchy2','Hierarchy3','HierarchySquare','HierarchySquare2',
  'HierarchySquare3','Home','Home2','Home3','HomeHashtag','HomeTrendDown',
  'HomeTrendUp','HomeWifi','Hospital','House','House2','Html3','Html5',
  'HuobiToken','I24Support','I3DCubeScan','I3DRotate','I3DSquare','I3Dcube',
  'I3Square','Icon','Illustrator','Image','Import','ImportCircle','ImportCurve',
  'ImportSquare','InfoCircle','Information','Instagram','Iost','JavaScript','Js',
  'Judge','Kanban','Key','KeySquare','Keyboard','KeyboardOpen','KyberNetwork',
  'Lamp','LampCharge','LampOn','LampSlash','LanguageCircle','LanguageSquare',
  'Layer','LayoutMaximize','Level','Lifebuoy','Like','Like1','LikeDislike',
  'LikeShapes','LikeTag','Link','Link1','Link2','Link21','LinkCircle','LinkSquare',
  'Litecoin','Location','LocationAdd','LocationCross','LocationDiscover',
  'LocationMinus','LocationSlash','LocationTick','Lock','Lock1','LockCircle',
  'LockSlash','Login','LoginCurve','Logout','LogoutCurve','Lovely','MagicStar',
  'Magicpen','MainComponent','Maker','Man','Map','Map1','Mask','MaskLeft',
  'MaskRight','Math','Maximize','Maximize1','Maximize2','Maximize3','Maximize4',
  'MaximizeCircle','Medal','MedalStar','Menu','MenuBoard','Message','Message2',
  'MessageAdd','MessageAdd1','MessageCircle','MessageEdit','MessageFavorite',
  'MessageMinus','MessageNotif','MessageProgramming','MessageQuestion',
  'MessageRemove','MessageSearch','MessageSquare','MessageText','MessageText1',
  'MessageTick','MessageTime','Messages','Messages1','Messages2','Messages3',
  'Messenger','Microphone','Microphone2','MicrophoneSlash','MicrophoneSlash1',
  'Microscope','Milk','MiniMusicSqaure','Minus','MinusCirlce','MinusSquare',
  'Mirror','MirroringScreen','Mobile','MobileProgramming','Monero','Money',
  'Money2','Money3','Money4','MoneyAdd','MoneyArchive','MoneyChange',
  'MoneyForbidden','MoneyRecive','MoneyRemove','MoneySend','MoneyTick','MoneyTime',
  'Moneys','Monitor','MonitorMobbile','MonitorRecorder','Moon','More','More2',
  'MoreCircle','MoreSquare','Mouse','MouseCircle','MouseSquare','Music',
  'MusicCircle','MusicDashboard','MusicFilter','MusicLibrary2','MusicPlay',
  'MusicPlaylist','MusicSquare','MusicSquareAdd','MusicSquareRemove',
  'MusicSquareSearch','Musicnote','Nebulas','Nem','Nexo','Next','Note','Note1',
  'NoteAdd','NoteFavorite','NoteRemove','NoteSquare','NoteText','Notepad',
  'Notepad2','Notification','Notification1','NotificationBing','NotificationCircle',
  'NotificationFavorite','NotificationStatus','OceanProtocol','Okb','Okru',
  'OmegaCircle','OmegaSquare','Ontology','Paintbucket','Paperclip','Paperclip2',
  'PasswordCheck','PathTool','PathTool2','PathToolSquare','Pause','PauseCircle',
  'Paypal','PenAdd','PenClose','PenRemove','PenTool','PenTool2','People',
  'PercentageCircle','PercentageSquare','Personalcard','Pet','Pharagraphspacing',
  'Photoshop','PictureFrame','Play','PlayAdd','PlayCircle','PlayCricle',
  'PlayRemove','Pointer','Polkadot','Polygon','Polyswarm','PresentionChart',
  'Previous','Printer','PrinterSlash','Profile','Profile2User','ProfileAdd',
  'ProfileCircle','ProfileDelete','ProfileRemove','ProfileTick',
  'ProgrammingArrow','ProgrammingArrows','Python','Quant','QuoteDown',
  'QuoteDownCircle','QuoteDownSquare','QuoteUp','QuoteUpCircle','QuoteUpSquare',
  'Radar','Radar2','Radio','Ram','Ram2','Rank','Ranking','Receipt','Receipt1',
  'Receipt2','Receipt21','ReceiptAdd','ReceiptDiscount','ReceiptDisscount',
  'ReceiptEdit','ReceiptItem','ReceiptMinus','ReceiptSearch','ReceiptSquare',
  'ReceiptText','Receive','ReceiveSquare','ReceiveSquare2','Record','RecordCircle',
  'RecoveryConvert','Refresh','Refresh2','RefreshCircle','RefreshLeftSquare',
  'RefreshRightSquare','RefreshSquare','Repeat','RepeatCircle','RepeateMusic',
  'RepeateOne','Reserve','RotateLeft','RotateRight','RouteSquare','Routing',
  'Routing2','RowHorizontal','RowVertical','Ruler','RulerPen','SafeHome',
  'Sagittarius','Save2','SaveAdd','SaveMinus','SaveRemove','Scan','ScanBarcode',
  'Scanner','Scanning','Scissor','Screenmirroring','Scroll','SearchFavorite',
  'SearchFavorite1','SearchNormal','SearchNormal1','SearchStatus','SearchStatus1',
  'SearchZoomIn','SearchZoomIn1','SearchZoomOut','SearchZoomOut1','Security',
  'SecurityCard','SecuritySafe','SecurityTime','SecurityUser','Send','Send2',
  'Setting','Setting2','Setting3','Setting4','Setting5','Settings','Shapes',
  'Shapes1','Share','Shield','ShieldCross','ShieldSearch','ShieldSecurity',
  'ShieldSlash','ShieldTick','Ship','Shop','ShopAdd','ShopRemove','ShoppingBag',
  'ShoppingCart','Shuffle','Shutterstock','Siacoin','SidebarBottom','SidebarLeft',
  'SidebarRight','SidebarTop','Signpost','Simcard','Simcard1','Simcard2','Size',
  'Slack','Slash','Slider','SliderHorizontal','SliderHorizontal1','SliderVertical',
  'SliderVertical1','Smallcaps','SmartCar','SmartHome','Smileys','Sms','SmsEdit',
  'SmsNotification','SmsSearch','SmsStar','SmsTracking','Snapchat','Solana','Sort',
  'Sound','Speaker','Speedometer','Spotify','Stacks','Star','Star1','StarSlash',
  'Status','StatusUp','Stellar','Sticker','Stickynote','Stop','StopCircle',
  'Story','Strongbox','Strongbox2','Subtitle','Sun','Sun1','SunFog',
  'TableDocument','TableLamp','Tag','Tag2','TagCross','TagRight','TagUser','Task',
  'TaskSquare','Teacher','Tenx','Tether','Text','TextBlock','TextBold',
  'TextItalic','TextUnderline','TextalignCenter','TextalignJustifycenter',
  'TextalignJustifyleft','TextalignJustifyright','TextalignLeft','TextalignRight',
  'TheGraph','Theta','Thorchain','TickCircle','TickSquare','Ticket','Ticket2',
  'TicketDiscount','TicketExpired','TicketStar','Timer','Timer1','TimerPause',
  'TimerStart','ToggleOff','ToggleOffCircle','ToggleOn','ToggleOnCircle','Trade',
  'TransactionMinus','Translate','Transmit','TransmitSqaure2','TransmitSquare',
  'Trash','Tree','Trello','TrendDown','TrendUp','Triangle','TriangleLogo',
  'Trontron','Truck','TruckFast','TruckRemove','TruckTick','TruckTime',
  'TrushSquare','Twitch','Ui8','Unlimited','Unlock','UsdCoin','User','UserAdd',
  'UserCirlceAdd','UserEdit','UserMinus','UserOctagon','UserRemove','UserSearch',
  'UserSquare','UserTag','UserTick','Velas','Verify','Vibe','Video','VideoAdd',
  'VideoCircle','VideoHorizontal','VideoOctagon','VideoPlay','VideoRemove',
  'VideoSlash','VideoSquare','VideoTick','VideoTime','VideoVertical','VoiceCricle',
  'VoiceSquare','Volume','VolumeCross','VolumeHigh','VolumeLow','VolumeLow1',
  'VolumeMute','VolumeSlash','VolumeUp','Wallet','Wallet1','Wallet2','Wallet3',
  'WalletAdd','WalletAdd1','WalletCheck','WalletMinus','WalletMoney',
  'WalletRemove','WalletSearch','Wanchain','Wanchain1','Warning2','Watch',
  'WatchStatus','Weight','WeightMeter','Whatsapp','Wifi','WifiSquare','Wind',
  'Wind2','Windows','Wing','Woman','WristClock','Xd','Xiaomi','Xrp','Youtube',
  'Zel','Zoom',
];

type SizeOption = 20 | 24 | 32;
type VariantOption = 'Linear' | 'Bold';

// Handles both ESM namespace and CJS __esModule interop.
// Note: iconsax-react uses React.forwardRef() which returns typeof === 'object',
// not 'function' — so we accept both.
function getIcon(name: string): React.ElementType | null {
  const mod = IcnsaxReact as Record<string, unknown>;

  // Try direct named export first (standard ESM / esbuild pre-bundle)
  const fromDirect = mod[name];
  if (fromDirect != null && (typeof fromDirect === 'function' || typeof fromDirect === 'object')) {
    return fromDirect as React.ElementType;
  }

  // Fallback: Vite CJS interop may wrap everything under .default
  const fromDefault = (mod['default'] as Record<string, unknown> | undefined)?.[name];
  if (fromDefault != null && (typeof fromDefault === 'function' || typeof fromDefault === 'object')) {
    return fromDefault as React.ElementType;
  }

  return null;
}

export const IconGallery: Story = {
  render: () => {
    const [size, setSize] = useState<SizeOption>(24);
    const [variant, setVariant] = useState<VariantOption>('Linear');
    const [search, setSearch] = useState('');
    const [color, setColor] = useState('var(--color-neutral-800)');

    const filtered = useMemo(
      () =>
        ALL_ICON_NAMES.filter((name) =>
          name.toLowerCase().includes(search.toLowerCase())
        ),
      [search]
    );

    const btnStyle = (active: boolean): React.CSSProperties => ({
      font: 'var(--text-body-4)',
      padding: '4px var(--space-3)',
      borderRadius: 'var(--radius-sm)',
      border: '1px solid var(--color-border-default)',
      background: active ? 'var(--color-neutral-800)' : 'var(--color-bg-default)',
      color: active ? 'var(--color-text-inverse)' : 'var(--color-text-secondary)',
      cursor: 'pointer',
    });

    const COLOR_PRESETS = [
      { label: 'Default', value: 'var(--color-neutral-800)' },
      { label: 'Brand', value: 'var(--color-brand-default)' },
      { label: 'Danger', value: 'var(--color-danger-default)' },
      { label: 'Success', value: 'var(--color-success-default)' },
      { label: 'Warning', value: 'var(--color-warning-default)' },
      { label: 'Muted', value: 'var(--color-text-tertiary)' },
    ];

    return (
      <div style={{ maxWidth: 1000 }}>
        <h2
          style={{
            font: 'var(--text-heading-5)',
            letterSpacing: 'var(--text-heading-tracking)',
            color: 'var(--color-text-primary)',
            marginBottom: 'var(--space-2)',
          }}
        >
          Icon Gallery
        </h2>
        <p
          style={{
            font: 'var(--text-body-4)',
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--space-5)',
          }}
        >
          {ALL_ICON_NAMES.length} icons from iconsax-react v0.0.8 · 2 variants · 3 sizes
        </p>

        {/* Controls */}
        <div
          style={{
            display: 'flex',
            gap: 'var(--space-4)',
            marginBottom: 'var(--space-5)',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          {/* Search */}
          <input
            type="text"
            placeholder="Search icons…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              font: 'var(--text-body-4)',
              padding: '6px var(--space-3)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border-default)',
              outline: 'none',
              width: 200,
              color: 'var(--color-text-primary)',
              background: 'var(--color-bg-default)',
            }}
          />

          {/* Size */}
          <div style={{ display: 'flex', gap: 'var(--space-1)', alignItems: 'center' }}>
            <span
              style={{
                font: 'var(--text-body-4)',
                color: 'var(--color-text-tertiary)',
                marginRight: 'var(--space-1)',
              }}
            >
              Size
            </span>
            {([20, 24, 32] as SizeOption[]).map((s) => (
              <button key={s} style={btnStyle(size === s)} onClick={() => setSize(s)}>
                {s}px
              </button>
            ))}
          </div>

          {/* Variant — Linear & Bold only */}
          <div style={{ display: 'flex', gap: 'var(--space-1)', alignItems: 'center' }}>
            <span
              style={{
                font: 'var(--text-body-4)',
                color: 'var(--color-text-tertiary)',
                marginRight: 'var(--space-1)',
              }}
            >
              Variant
            </span>
            {(['Linear', 'Bold'] as VariantOption[]).map((v) => (
              <button key={v} style={btnStyle(variant === v)} onClick={() => setVariant(v)}>
                {v}
              </button>
            ))}
          </div>

          {/* Color presets */}
          <div style={{ display: 'flex', gap: 'var(--space-1)', alignItems: 'center' }}>
            <span
              style={{
                font: 'var(--text-body-4)',
                color: 'var(--color-text-tertiary)',
                marginRight: 'var(--space-1)',
              }}
            >
              Color
            </span>
            {COLOR_PRESETS.map(({ label, value }) => (
              <button
                key={label}
                title={label}
                onClick={() => setColor(value)}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 'var(--radius-sm)',
                  border: color === value
                    ? '2px solid var(--color-brand-default)'
                    : '1px solid var(--color-border-default)',
                  background: value,
                  cursor: 'pointer',
                  padding: 0,
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* Custom Moji Icons */}
        <h3
          style={{
            font: 'var(--text-subtitle-4)',
            color: 'var(--color-text-tertiary)',
            marginBottom: 'var(--space-3)',
          }}
        >
          Custom Moji Icons
        </h3>
        <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
          {[
            {
              name: 'CloseIcon',
              component: <Icon icon={CloseIcon} size={size} color={color} />,
            },
            {
              name: 'SpinnerIcon',
              component: <Icon icon={SpinnerIcon} size={size} color={color} />,
            },
          ].map(({ name, component }) => (
            <div
              key={name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border-default)',
                minWidth: 72,
              }}
            >
              {component}
              <span
                style={{
                  font: 'var(--text-body-4)',
                  color: 'var(--color-text-secondary)',
                  textAlign: 'center',
                  wordBreak: 'break-word',
                  maxWidth: 80,
                }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>

        {/* iconsax-react full gallery */}
        <h3
          style={{
            font: 'var(--text-subtitle-4)',
            color: 'var(--color-text-tertiary)',
            marginBottom: 'var(--space-3)',
          }}
        >
          iconsax-react ({filtered.length}{search ? ` of ${ALL_ICON_NAMES.length}` : ''})
        </h3>

        {filtered.length === 0 && (
          <p style={{ font: 'var(--text-body-3)', color: 'var(--color-text-tertiary)' }}>
            No icons match &ldquo;{search}&rdquo;
          </p>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          {filtered.map((name) => {
            const Icn = getIcon(name);
            if (!Icn) return null;
            return (
              <div
                key={name}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-3)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border-default)',
                  minWidth: 72,
                  maxWidth: 88,
                }}
              >
                <Icn size={size} variant={variant} color={color} />
                <span
                  style={{
                    font: 'var(--text-body-4)',
                    color: 'var(--color-text-secondary)',
                    textAlign: 'center',
                    wordBreak: 'break-word',
                    fontSize: 10,
                  }}
                >
                  {name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
  parameters: { chromatic: { disableSnapshot: true } },
};

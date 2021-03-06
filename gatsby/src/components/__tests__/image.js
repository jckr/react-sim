import React from 'react';
import renderer from 'react-test-renderer';
import { ImageComponent, imageNames } from '../image';

const data = {
  model: {
    childImageSharp: {
      fluid: {
        base64:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAABRNAAAUTQGUyo0vAAAAj0lEQVQ4y+WUSw6AIAxEvf9dNbpSLEOlfpAYP7Vxo5I0LEofM1Ao+OFRvBcYQkhzHnlODTwq1EBVCj3AFONqQ5VCR557jzhPsV1zCygAYC2kCO5naG5fBZQQZQJsKuK6pDEnQA+jZVE42u7AXYsEhBUoSuQMc8vOYnkPulyOqW2uim63zdlLMTf2D3+b7wIHOlU4PsIxyuoAAAAASUVORK5CYII=',
        aspectRatio: 1,
        src: '/static/fb8a1550d441015ff2845cfb686a3196/50a75/model.png',
        srcSet:
          '/static/fb8a1550d441015ff2845cfb686a3196/e1953/model.png 250w,\n/static/fb8a1550d441015ff2845cfb686a3196/46604/model.png 500w,\n/static/fb8a1550d441015ff2845cfb686a3196/50a75/model.png 660w',
        sizes: '(max-width: 660px) 100vw, 660px',
      },
    },
  },
  modelState: {
    childImageSharp: {
      fluid: {
        base64:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAABRNAAAUTQGUyo0vAAAArklEQVQ4y+WU3QrCMAyF9/5P6oWDyoZr89NjWnV0oGtXvFEHIYWQr+ekYQM+/A3fC4wxrrmMstYM3DQWzS3QukILEQWrPiu70KrCQGIwy6z5/CjgnetdYEjKzhdgumZlYZxWaGm/CZiCDKgLwZ0WuJEB4gwU7bQcWPIMiQDv7zPMl/QCxR4iWLO6GdFsc5opd1jeQC372edI6rrWptZ0eG3KpY4vomux//Bv87vAG7zmN4k7Td+MAAAAAElFTkSuQmCC',
        aspectRatio: 1,
        src: '/static/19f13b1cab43283c7caacb10d8db5380/50a75/model-state.png',
        srcSet:
          '/static/19f13b1cab43283c7caacb10d8db5380/e1953/model-state.png 250w,\n/static/19f13b1cab43283c7caacb10d8db5380/46604/model-state.png 500w,\n/static/19f13b1cab43283c7caacb10d8db5380/50a75/model-state.png 660w',
        sizes: '(max-width: 660px) 100vw, 660px',
      },
    },
  },
  modelInitData: {
    childImageSharp: {
      fluid: {
        base64:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAABRNAAAUTQGUyo0vAAABa0lEQVQ4y51Ui3KEIAz0/7+07VXP61mBPEgTFA8Vz6moAwO47G4SGqm0GOOqZ+2Z42691pqjhRKMmOde59IbD0GbM4aILMMPyaNFcZ4S2DuWbwFNprHCwBI8C8DE9BSwZJS/hSHxwgpVem1vOdfE2onlJv1AZQfcg9VU7RjSJpoBSFD7DFq2bAkfMSRLDzGZpLSC+uYEb73Ic5wkq3yYQQ0oPzkLVgxtEkIUPyojNwohCthGB9J/OOk7TD8YoIEFDVD3BdJ+gtxbKADnvLKNzx7TBgwgpCyTbwYCepDnFaCxdXq4H1m848WqRbJNmGR7EDXfUEGDl6Bs+fsucRiTl0HXsiqeLeIiSM2+KmzxZTzpOPwq8ODVgnV0bThFXE7SpiytFKwJONfzNgfLNGq2iVlLbCJeapo4Sq0YzksvTr4iRhkeJN3NAhVTtVyv5YXhdEnYmPnC5VCrnm1FXL6+juy4fMEeRfPfkq+2P9q7M3cbadvNAAAAAElFTkSuQmCC',
        aspectRatio: 1,
        src:
          '/static/4c025cdc250b670a817895d72151a768/50a75/model-init-data.png',
        srcSet:
          '/static/4c025cdc250b670a817895d72151a768/e1953/model-init-data.png 250w,\n/static/4c025cdc250b670a817895d72151a768/46604/model-init-data.png 500w,\n/static/4c025cdc250b670a817895d72151a768/50a75/model-init-data.png 660w',
        sizes: '(max-width: 660px) 100vw, 660px',
      },
    },
  },
  modelControls: {
    childImageSharp: {
      fluid: {
        base64:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAABRNAAAUTQGUyo0vAAABZUlEQVQ4y6VUi3aDIAz1//+03dqpfSB5jgTodOLcHG0OLYTLzU1Cp40hIouZ08wsq/3W6LY25mDEXOa05l/ZBO32GCKy3kfS4UoaJnKwn1h2u+yIFJ6TxltQgMx0F3DOqJpK5oIAKtPDDRErv4Xv/HwnGze+1iFqDMFNCBcXt/xXDKvwWtSaxiGxjAoRUthjPZ0l4ezPWwzJyiPBILEDxuQM5151fOT/74NGIPc3oPqpVbBgaIsQWafA7mwGCZgDaH8K2l9SuIAOaBfHlKDrGfRyAv24wAyw1BWk8rj16A7G0AAjsocNUfwiG1D2zCc8SafnFwkHrCE7K8kheMiiBZS0iOrrdkmNiotEPEtSt+6KZQYrUzNjN9/L1SU1R78rmwzKq2y27BVys7Br65lmJK+erlp9P7PfekVDRNH7QHp9AwdG5v/1cmVoj4T9Zj7wOLS6p6XhoedrS47DD+xWNv8c8tHxCVFiM0moiqsvAAAAAElFTkSuQmCC',
        aspectRatio: 1,
        src:
          '/static/88d55de73cafaa0dcc328aa28b00410a/50a75/model-controls.png',
        srcSet:
          '/static/88d55de73cafaa0dcc328aa28b00410a/e1953/model-controls.png 250w,\n/static/88d55de73cafaa0dcc328aa28b00410a/46604/model-controls.png 500w,\n/static/88d55de73cafaa0dcc328aa28b00410a/50a75/model-controls.png 660w',
        sizes: '(max-width: 660px) 100vw, 660px',
      },
    },
  },
  modelComponents: {
    childImageSharp: {
      fluid: {
        base64:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAABRNAAAUTQGUyo0vAAABQklEQVQ4y51UgXaDMAj0//9029PVra9qgLBcIhafSV2lzUtL8DwOSKcVizHudkm7SDyc16xrHXgwFln35Mvf2ATtzhgSid5/WMeedJo5g71i+RIQaYIVLaLLLBpCYXoK6BnZ2hiybKwopV6L9b4uNt7o/SGlvdARrBZ/YGjC2/+FOLM0UG8mibQYMtpDS5owAPh2MWAYgOxjXbBjCGdI4s+T5GCswAVwHEhvqcowAOJsSQUaPoP2H0G/++AA175C4O+NcgCYZMBVN1QYL/KAiJkerPPjSSIDWsqZVSwp5JRj8UFDn7LpiOdklUhckbrjVOwrWEALECTwZ/hZKq7/b5sCKodq1taW8lljM8dtpk2rVk+2R2/VkCjqfWQdvkIGxrRcn2XHEJcE8bMv3wKsTU9Nw0vXV0uOyxdsq5pvp3zV/gDRhTRUKjJ4HAAAAABJRU5ErkJggg==',
        aspectRatio: 1,
        src:
          '/static/e34fbf0f523b3afd20ee35e57864ec8a/50a75/model-components.png',
        srcSet:
          '/static/e34fbf0f523b3afd20ee35e57864ec8a/e1953/model-components.png 250w,\n/static/e34fbf0f523b3afd20ee35e57864ec8a/46604/model-components.png 500w,\n/static/e34fbf0f523b3afd20ee35e57864ec8a/50a75/model-components.png 660w',
        sizes: '(max-width: 660px) 100vw, 660px',
      },
    },
  },
  modelHighLevelView: {
    childImageSharp: {
      fluid: {
        base64:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAABRNAAAUTQGUyo0vAAABXUlEQVQ4y6VUi3aDIAz1//9027Gre6jkuRsBS622WxfNQRK83ISEznfEzK5GxahqN/496Y4cLZiolhG25bVD0O4RQ2b1r0F86NmnWRaweyzvAkaYIgAlc0pQykwfAraMqq4MAWoIGej5e2dta+vsYMdlXmzz8O3zx1gdVyDbqG4YSmVRfkoszqJO0IR8erPRkhKoHjEUy84ACEkY23KpwCHLxuWpVXDFMIyU1OdJcRDQMWHOkTofTuznnvImsDNSkHDip1fy/oX8Hb4LYKkrQjifZ/Yei6JUZCZPAIxlac4bhRCJCzTWTCPsYyFRIllDDkOEHE8NWUoO25BT8VlJj3oedw9FN4eygoJpaOSv9eVPq9Pflw1H3ibkaVM2e7XYbQvzprBF19IQueRq+8/j1rOcV2Zbevn0RrkNVf/Ry5Wh5EuCm7r8E+Be92w74unr6ygdT1+wR6f555CflR+/dTPAtuR3pQAAAABJRU5ErkJggg==',
        aspectRatio: 1,
        src:
          '/static/524a3d2594d8e6221496cf93e089f32c/50a75/model-high-level-view.png',
        srcSet:
          '/static/524a3d2594d8e6221496cf93e089f32c/e1953/model-high-level-view.png 250w,\n/static/524a3d2594d8e6221496cf93e089f32c/46604/model-high-level-view.png 500w,\n/static/524a3d2594d8e6221496cf93e089f32c/50a75/model-high-level-view.png 660w',
        sizes: '(max-width: 660px) 100vw, 660px',
      },
    },
  },
  modelUpdateData: {
    childImageSharp: {
      fluid: {
        base64:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAABRNAAAUTQGUyo0vAAABeklEQVQ4y51UAZLCIAzk/z/1HKs9q0BIshegra0WPctIqZDZ7m4SHDaGqq5WsVVEX863hmsdLMFYZFxtr/y0Ceo+MUxJMPwy+lOCD1zA3rF8C5hlZlYpCmIQEFWmHwGXjKY5M2QZWdm7Sa9nuopdxjttfHHet0kmOxZgzHut+BeGk/HT/0hsLBkxksmOUDEfVRaWrG1YMeRcHqgy88is0rEH+ivACfHQIQ6DHXiwv9VsYw3qHszMdDM/eCks8yQDFE+4HDwuHWftxjiBg0c8d+h+CKcD4XyiBeBYV9mn6yWVgMwwA8ZUfSMCws0eQiBf2SUD9ncjcOeZRAGcJBdWWiUUyYrCOsuW3uR1Z6RwLz6iZHbsIAuURabda1esuyB/JA4B8RatbHTO9ASq4/rvskFJFsqc+vm5Bpe16J4Lc6uwmWXuaRbFVjN8bj2tvqakGHpGdyQDrt2yv5dnhvWSyO8iOy6Hre7JUxoyv7q+WnbsvmBb2fxa8t7xB7OIMuXEuEYgAAAAAElFTkSuQmCC',
        aspectRatio: 1,
        src:
          '/static/c5ebf912c63d1c8ad758888d45bbcde9/50a75/model-update-data.png',
        srcSet:
          '/static/c5ebf912c63d1c8ad758888d45bbcde9/e1953/model-update-data.png 250w,\n/static/c5ebf912c63d1c8ad758888d45bbcde9/46604/model-update-data.png 500w,\n/static/c5ebf912c63d1c8ad758888d45bbcde9/50a75/model-update-data.png 660w',
        sizes: '(max-width: 660px) 100vw, 660px',
      },
    },
  },
  modelFrame: {
    childImageSharp: {
      fluid: {
        base64:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAABRNAAAUTQGUyo0vAAABcElEQVQ4y51Ui5LCIAzs/3/p3TnVPrQFkrAXXrXaotNSGTBhlt08aLAzvPcvq+gq4jf+vdHUHGswFsmr2uLPV0GbbwyJBPeB0beE2XAE+8TyI2CQGViRFVgjcC4x/Qq4ZlTmwpAls9K9St87u7Y1vnLjYtfpVLYlgV/5auc3DEvgy3/rGKRrBNV9dryERGoMOZQHkswwrK506YFxilxtOy6gAah8pQpeGAaj0+CbWeLhMJ0C8n1C9zOjax0wTxGQI3PB9c+h/XW4qe8JmOsqSBo7igcCwwAY48ZOswu9SJkJpUskqZgnhpmeJCJgkRxZ+SShSA6srZkh/QO+69VO8ZKiSnKIZJWkZtsVxZkvchZmeMB0g6qgZF3iXjKOA2WjrMhMYJ3CvFuD6zJq3gtzU9ghXkOnyek1JCkMe83wvfV8iiuRx71nXC8EptQt53s5tx4rNdIyCfvyjB0C3Oue9444/XzVwnH6ga1l87Dks+Mfr6Ey/QgYmPsAAAAASUVORK5CYII=',
        aspectRatio: 1,
        src: '/static/90f9c1a46557b8c75a72ad8333affb93/50a75/model-frame.png',
        srcSet:
          '/static/90f9c1a46557b8c75a72ad8333affb93/e1953/model-frame.png 250w,\n/static/90f9c1a46557b8c75a72ad8333affb93/46604/model-frame.png 500w,\n/static/90f9c1a46557b8c75a72ad8333affb93/50a75/model-frame.png 660w',
        sizes: '(max-width: 660px) 100vw, 660px',
      },
    },
  },
};

describe('Image', () => {
  imageNames.forEach(name =>
    it('renders correctly', () => {
      const tree = renderer
        .create(<ImageComponent data={data} name={name} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    })
  );
});
